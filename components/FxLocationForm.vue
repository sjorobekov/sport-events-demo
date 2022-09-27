<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <v-card class="fx-card-border-top-primary mb-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <FxInstructionItem>
              <template #number>
                1
              </template>
              <template #title>
                Search Location
              </template>
              <template #content>
                Select the name for the location
              </template>
            </FxInstructionItem>
          </v-col>

          <v-col
            cols="12"
            md="7"
            lg="4"
            class="pt-8"
          >
            <label for="location_name">Search Location</label>
            <GmapAutocomplete
              v-slot="{ attrs, listeners }"
              :set-fields-to="setFieldsTo"
              :component-restrictions="componentRestrictions"
              @place_changed="onPlaceChange"
            >
              <v-text-field
                ref="input"
                outlined
                dense
                v-bind="attrs"
                v-on="listeners"
              />
            </GmapAutocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="fx-card-border-top-primary mb-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <FxInstructionItem>
              <template #number>
                2
              </template>
              <template #title>
                Sports Location Name
              </template>
              <template #content>
                Select the name for the location
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            md="7"
            lg="4"
            class="pt-8"
          >
            <label for="location_name">Sports Location Name</label>
            <v-text-field
              id="location_name"
              v-async-validate
              :value="formData.name"
              placeholder="Location Name"
              :async-rules="[$rule.required]"
              dense
              outlined
              maxlength="120"
              @input="update('name', $event)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="fx-card-border-top-primary">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <FxInstructionItem>
              <template #number>
                3
              </template>
              <template #title>
                Address & Map
              </template>
              <template #content>
                Enter the address of the location
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            md="7"
            lg="7"
            class="pt-8"
          >
            <label for="address">Sports Location Address</label>

            <v-text-field
              id="address"
              v-async-validate
              :value="formData.address"
              placeholder="Location Address"
              :async-rules="[$rule.required]"
              dense
              outlined
            />
            <GmapMap
              ref="mapRef"
              :center="mapCenter"
              :zoom="zoom"
              style="height: 300px"
              :options="mapOptions"
            >
              <GmapMarker :position="formData.coordinates" :draggable="true" @update:position="updatePositionHandler" />
            </GmapMap>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'FxLocationForm',

  props: {
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    country: {
      type: String,
      default: undefined,
    },
  },

  data: () => ({
    mapCenter: { lng: 0, lat: 0 },
  }),

  computed: {
    formData () {
      return {
        ...(this.value || { name: '', address: '' }),
      }
    },

    componentRestrictions () {
      return {
        country: this.country,
      }
    },

    setFieldsTo () {
      return ['formatted_address', 'name', 'geometry.location']
    },

    zoom () {
      if (this.value.coordinates?.lat && this.value.coordinates?.lng) {
        return 15
      }

      return 1
    },

    mapOptions () {
      return {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: true,
      }
    },
  },

  watch: {
    'formData.coordinates': {
      handler (val) {
        this.panTo({ ...val })
          .catch((e) => {
            console.error(e)
          })
      },
      deep: true,
    },
  },

  mounted () {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
    if (this.formData.coordinates?.lat && this.formData.coordinates?.lng) {
      setTimeout(() => {
        this.panTo({ ...this.formData.coordinates })
      }, 500)
    }
  },
  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },
    updatePositionHandler (coordinates) {
      this.$emit('input', {
        ...this.formData,
        coordinates,
      })
    },
    onPlaceChange (val) {
      this.$emit('input', {
        ...this.formData,
        address: val.formatted_address,
        name: val.name,
        coordinates: {
          lat: val.geometry?.location.lat(),
          lng: val.geometry?.location.lng(),
        },
      })
    },
    panTo (location) {
      return this.$refs.mapRef.$mapPromise.then((map) => {
        return map.panTo(location)
      })
    },
  },
}
</script>

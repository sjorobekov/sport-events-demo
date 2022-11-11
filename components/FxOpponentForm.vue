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
                Opponent Name
              </template>
              <template #content>
                Enter the opponent name
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            md="7"
            lg="7"
            class="pt-8"
          >
            <label for="name">Opponent Name</label>
            <v-text-field
              id="name"
              v-async-validate
              :value="formData.name"
              placeholder="Name"
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
                Address & Contact Details
              </template>
              <template #content>
                Enter the opponent address
              </template>
            </FxInstructionItem>
          </v-col>
          <v-col
            cols="12"
            md="7"
            lg="7"
            class="pt-8"
          >
            <label for="address">Opponent Address</label>
            <v-text-field
              id="address"
              v-async-validate
              :value="formData.address"
              placeholder="Address"
              :async-rules="[$rule.required]"
              dense
              outlined
              @input="update('address', $event)"
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
  name: 'FxOpponentForm',

  props: {
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
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
    panTo (location) {
      return this.$refs.mapRef.$mapPromise.then((map) => {
        return map.panTo(location)
      })
    },
  },
}
</script>

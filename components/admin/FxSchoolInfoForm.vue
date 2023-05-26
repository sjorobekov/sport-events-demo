<template>
  <v-form
    ref="form"
    v-async-form
    :disabled="disabled"
  >
    <label for="school_name">School Name</label>
    <v-text-field
      id="school_name"
      v-async-validate
      :value="formData.name"
      :async-rules="[$rule.required]"
      placeholder="Enter School Name"
      dense
      outlined
      maxlength="120"
      @input="update('name', $event)"
    />

    <label for="location_name">Search Location</label>
    <GmapAutocomplete
      v-slot="{ attrs, listeners }"
      :set-fields-to="setFieldsTo"
      :component-restrictions="componentRestrictions"
      @place_changed="onPlaceChange"
    >
      <v-text-field
        id="location_name"
        ref="input"
        outlined
        dense
        v-bind="attrs"
        v-on="listeners"
      />
    </GmapAutocomplete>

    <label for="street">Street</label>
    <v-text-field
      id="street"
      :value="formData.street"
      placeholder="Street"
      dense
      outlined
      maxlength="120"
      @input="update('street', $event)"
    />

    <label for="city">City</label>
    <v-text-field
      id="city"
      :value="formData.city"
      placeholder="City"
      dense
      outlined
      maxlength="50"
      @input="update('city', $event)"
    />

    <label for="zip">Zip</label>
    <v-text-field
      id="zip"
      placeholder="Zip Code"
      :value="formData.zip"
      dense
      outlined
      maxlength="15"
      @input="update('zip', $event)"
    />

    <label for="country">Country</label>
    <v-autocomplete
      id="country"
      :value="formData.country"
      dense
      :items="countries"
      outlined
      item-value="code"
      placeholder="Select Country"
      item-text="name"
      @input="update('country', $event)"
    />

    <label for="website">School Website</label>
    <v-text-field
      id="website"
      v-async-validate
      :value="formData.website"
      dense
      :async-rules="[$rule.url]"
      placeholder="https://website.com"
      outlined
      maxlength="120"
      @input="update('website', $event)"
    />

    <label for="email_domain">Email Domains</label>
    <v-combobox
      id="email_domain"
      v-async-validate
      :value="formData.emailDomains"
      :async-rules="[domains, maxItems, doesntContainPublicDomains]"
      multiple
      outlined
      dense
      chips
      hint="Associate E-mail Addresses from these domains with the School"
      persistent-hint
      deletable-chips
      append-icon=""
      @input="update('emailDomains', $event)"
    />

    <label for="mapRef">Location</label>
    <GmapMap
      ref="mapRef"
      :center="mapCenter"
      :zoom="zoom"
      style="height: 300px"
      :options="mapOptions"
    >
      <GmapMarker :position="formData.coordinates" :draggable="true" @update:position="updatePositionHandler" />
    </GmapMap>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { PUBLIC_DOMAINS } from '~/common'
const DOMAIN_REGEXP = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/

export default {
  name: 'SchoolInfoForm',
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
    ...mapGetters({
      countries: 'countries/list',
    }),

    formData () {
      return this.value || {}
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

    componentRestrictions () {
      return {}
    },

    setFieldsTo () {
      return ['address_components', 'geometry.location']
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
    const coordinates = (this.formData.coordinates?.lat && this.formData.coordinates?.lng)
      ? { ...this.formData.coordinates }
      : { lat: 0, lng: 0 }

    this.panTo(coordinates)
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },

    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },

    domains (val) {
      if (!val) {
        return true
      }
      return val.every(item => DOMAIN_REGEXP.test(item)) || 'Field contains invalid domain(s)'
    },

    doesntContainPublicDomains (val) {
      if (!val) {
        return true
      }

      return val.every(item => !PUBLIC_DOMAINS.includes(item)) || 'Public E-Mail services are not allowed'
    },

    maxItems (val) {
      if (!val) {
        return true
      }
      return val.length <= 5 || 'Max number of domains is 5'
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

    onPlaceChange (val) {
      const address = this.getAddressObject(val.address_components)

      this.$emit('input', {
        ...this.formData,
        city: address.city,
        country: address.country,
        street: `${address.home} ${address.street}`,
        zip: address.postal_code,
        coordinates: {
          lat: val.geometry?.location.lat(),
          lng: val.geometry?.location.lng(),
        },
      })
    },

    getAddressObject (addressComponents) {
      const ShouldBeComponent = {
        home: ['street_number'],
        postal_code: ['postal_code'],
        street: ['street_address', 'route'],
        region: [
          'administrative_area_level_1',
          'administrative_area_level_2',
          'administrative_area_level_3',
          'administrative_area_level_4',
          'administrative_area_level_5',
        ],
        city: [
          'locality',
          'sublocality',
          'sublocality_level_1',
          'sublocality_level_2',
          'sublocality_level_3',
          'sublocality_level_4',
        ],
        country: ['country'],
      }

      const address = {
        home: '',
        postal_code: '',
        street: '',
        region: '',
        city: '',
        country: '',
      }

      addressComponents.forEach((component) => {
        for (const shouldBe in ShouldBeComponent) {
          if (ShouldBeComponent[shouldBe].includes(component.types[0])) {
            if (shouldBe === 'country') {
              address[shouldBe] = component.short_name
            } else {
              address[shouldBe] = component.long_name
            }
          }
        }
      })
      return address
    },
  },
}
</script>

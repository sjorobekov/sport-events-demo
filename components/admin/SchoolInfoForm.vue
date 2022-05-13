<template>
  <v-form
    ref="form"
    v-async-form
    :disabled="disabled"
  >
    <label for="school_name">School Name</label>
    <v-text-field
      id="school_name"
      v-model="formData.name"
      v-async-validate
      :async-rules="[$rule.required]"
      dense
      outlined
      maxlength="120"
    />

    <label for="street">Street</label>
    <v-text-field id="street" v-model="formData.street" dense outlined maxlength="120" />

    <label for="zip">Zip</label>
    <v-text-field id="zip" v-model="formData.zip" dense outlined maxlength="15" />

    <label for="city">City</label>
    <v-text-field id="city" v-model="formData.city" dense outlined maxlength="50" />

    <label for="state">State/Province</label>
    <v-text-field id="state" v-model="formData.state" dense outlined maxlength="50" />

    <label for="country">Country</label>
    <v-select
      id="country"
      v-model="formData.country"
      dense
      :items="countries"
      outlined
      item-value="code"
      item-text="name"
    />

    <label for="website">School Website</label>
    <v-text-field
      id="website"
      v-model="formData.website"
      v-async-validate
      dense
      :async-rules="[$rule.url]"
      placeholder="https://website.com"
      outlined
      maxlength="120"
    />
  </v-form>
</template>

<script>
import { getData } from 'country-list'

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
    countries: getData(),
  }),
  computed: {
    formData: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', { ...val })
      },
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
  },
}
</script>

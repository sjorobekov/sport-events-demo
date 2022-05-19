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
      dense
      outlined
      maxlength="120"
      @input="update('name', $event)"
    />

    <label for="street">Street</label>
    <v-text-field
      id="street"
      :value="formData.street"
      dense
      outlined
      maxlength="120"
      @input="update('street', $event)"
    />

    <label for="zip">Zip</label>
    <v-text-field
      id="zip"
      :value="formData.zip"
      dense
      outlined
      maxlength="15"
      @input="update('zip', $event)"
    />

    <label for="city">City</label>
    <v-text-field
      id="city"
      :value="formData.city"
      dense
      outlined
      maxlength="50"
      @input="update('city', $event)"
    />

    <label for="state">State/Province</label>
    <v-text-field
      id="state"
      :value="formData.state"
      dense
      outlined
      maxlength="50"
      @input="update('state', $event)"
    />

    <label for="country">Country</label>
    <v-select
      id="country"
      :value="formData.country"
      dense
      :items="countries"
      outlined
      item-value="code"
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
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'

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

  computed: {
    ...mapGetters({
      countries: 'countries/list',
    }),

    formData () {
      return this.value || {}
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },
  },
}
</script>

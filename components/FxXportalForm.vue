<template>
  <v-form
    ref="form"
    v-async-form
    :disabled="disabled"
  >
    <label for="xportalRelyingPartyId">Relying Party Id</label>
    <v-text-field
      id="xportalRelyingPartyId"
      :value="formData.xportalRelyingPartyId"
      clearable
      dense
      outlined
      maxlength="50"
      @input="update('xportalRelyingPartyId', $event)"
    />

    <label for="xportalSchoolId">School Estab Code</label>
    <v-text-field
      id="xportalSchoolId"
      :value="formData.xportalSchoolId"
      clearable
      dense
      outlined
      maxlength="50"
      @input="update('xportalSchoolId', $event)"
    />

    <label for="xportalSecret">App Estab Secret</label>
    <v-text-field
      id="xportalSecret"
      type="password"
      :value="formData.xportalSecret"
      clearable
      dense
      outlined
      maxlength="50"
      @input="update('xportalSecret', $event)"
    />
  </v-form>
</template>

<script>

export default {
  name: 'FxXportalForm',
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
    formData () {
      return (this.value || {})
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

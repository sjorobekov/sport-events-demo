<template>
  <v-form
    ref="form"
    v-async-form
    :disabled="disabled"
  >
    <label for="displayName">Sport Name</label>
    <v-text-field
      id="name"
      v-async-validate
      :value="formData.name"
      dense
      :async-rules="[$rule.required]"
      outlined
      maxlength="120"
      @input="update('name', $event)"
    />

    <label for="color">Hex Color</label>
    <FxColorPicker :value="formData.color" @input="update('color', $event)">
      <template #activator="{on, attrs}">
        <v-text-field
          id="color"
          v-async-validate
          readonly
          prepend-inner-icon="$vuetify.icons.colorPicker"
          v-bind="attrs"
          :value="formData.color"
          :async-rules="[$rule.required]"
          dense
          outlined
          maxlength="7"
          v-on="on"
        />
      </template>
    </FxColorPicker>
  </v-form>
</template>

<script>
import { ADMIN, SPORTS_USER, VIEW_ONLY } from '@/enum/UserRole'

export default {
  name: 'FxSportForm',
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
    userRoleOptions () {
      return [
        { value: ADMIN, text: 'Admin' },
        { value: SPORTS_USER, text: 'Sports User' },
        { value: VIEW_ONLY, text: 'View Only' },
      ]
    },

    formData () {
      return this.value ? this.value : { userRole: ADMIN }
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

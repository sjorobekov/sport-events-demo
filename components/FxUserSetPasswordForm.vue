<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <v-text-field
      id="password"
      v-async-validate
      :value="formData.password"
      :async-rules="[$rule.required, $rule.minLength(4)]"
      hide-details
      outlined
      :append-icon="showPass ? '$vuetify.icons.password-hide' : '$vuetify.icons.password-show'"
      :type="showPass ? 'text' : 'password'"
      height="56"
      label="Set Password"
      placeholder="********************"
      @input="update('password', $event)"
      @click:append="showPass = !showPass"
    />
    <v-text-field
      id="password_confirm"
      v-model="formData.confirm"
      v-async-validate
      :async-rules="[$rule.required, $rule.equal(formData.password)]"
      hide-details
      outlined
      :append-icon="showPass ? '$vuetify.icons.password-hide' : '$vuetify.icons.password-show'"
      :type="showPass ? 'text' : 'password'"
      height="56"
      placeholder="********************"
      label="Confirm Password"
    />
  </v-form>
</template>

<script>
export default {
  name: 'FxUserSetPasswordForm',
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
    showPass: false,
  }),

  computed: {
    formData () {
      return this.value || { password: '' }
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

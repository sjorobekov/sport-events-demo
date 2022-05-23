<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <label class="caption" for="password">New Password</label>
    <v-text-field
      id="password"
      v-async-validate
      :value="formData.password"
      :async-rules="[$rule.required, $rule.minLength(4)]"
      dense
      outlined
      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPass ? 'text' : 'password'"
      @input="update('password', $event)"
      @click:append="showPass = !showPass"
    />

    <div v-if="!showPass">
      <label class="caption" for="password_confirm">Confirm New Password</label>
      <v-text-field
        id="password_confirm"
        v-model="formData.confirm"
        v-async-validate
        :async-rules="[$rule.required, $rule.equal(formData.password)]"
        dense
        outlined
        type="password"
      />
    </div>
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

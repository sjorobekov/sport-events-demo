<template>
  <v-form
    ref="form"
    v-async-form
    :disabled="disabled"
  >
    <label for="password">Current Password</label>
    <v-text-field
      id="password"
      v-model="formData.currentPassword"
      dense
      outlined
      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPass ? 'text' : 'password'"
      @click:append="showPass = !showPass"
    />

    <label for="newPassword">New Password</label>
    <v-text-field
      id="newPassword"
      v-model="formData.password"
      v-async-validate
      :async-rules="[$rule.required, $rule.minLength(4)]"
      dense
      outlined
      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPass ? 'text' : 'password'"
      @click:append="showPass = !showPass"
    />

    <template v-if="!showPass">
      <label for="confirmPassword">Confirm New Password</label>
      <v-text-field
        id="confirmPassword"
        v-model="confirmPassword"
        v-async-validate
        :async-rules="[$rule.required, $rule.equal(formData.password)]"
        dense
        outlined
        type="password"
      />
    </template>
    <v-btn class="float-right" depressed color="primary" @click="save()">
      Update Password
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'FxProfilePasswordChangeForm',
  data: () => ({
    showPass: false,
    formData: {
      password: '',
      currentPassword: '',
    },
    confirmPassword: '',
    disabled: false,
  }),

  methods: {
    async save () {
      this.disabled = true

      const isValid = await this.$refs.form.validateAsync()

      if (!isValid) {
        this.disabled = false
        return
      }

      this.$store.dispatch('api/profile/changePassword', this.formData)
        .then(() => {
          this.$toast.success('Password has been updated!')
          this.$refs.form.reset()
        })
        .catch((err) => {
          if (err.response?.data?.error === 'wrong_credentials') {
            this.$toast.error('Current password is invalid')
          } else {
            this.$toast.error('Unknown Error')
          }
        })
        .finally(() => {
          this.disabled = false
        })
    },
  },
}
</script>

<template>
  <v-card flat outlined>
    <v-form ref="form" v-async-form :disabled="loading" @submit.prevent="submit">
      <v-card-title>Sign In</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="formData.email"
          v-async-validate
          label="Email"
          outlined
          :async-rules="[$rule.required, $rule.email]"
        />
        <v-text-field
          v-model="formData.password"
          v-async-validate
          label="Password"
          outlined
          :async-rules="[$rule.required]"
          type="password"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          type="submit"
          depressed
          color="brand"
          dark
          :loading="loading"
          @click="submit"
        >
          Sign In
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'LoginPage',
  data: () => ({
    formData: {
      email: '',
      password: '',
    },
    loading: false,
  }),

  methods: {
    async submit () {
      try {
        this.loading = true
        const isValid = await this.$refs.form.validateAsync()
        if (!isValid) {
          this.loading = false
          return
        }
        await this.$store.dispatch('context/signIn', this.formData)
        await this.$router.push({ name: 'management' })
      } catch (e) {
        this.loading = false
        this.$toast.error('Unknown Error')
      }
    },
  },
}
</script>

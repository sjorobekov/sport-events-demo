<template>
  <div>
    <h1 class="text-sm-h2 text-h3s text-center mt-2 mt-sm-6 neutral--text text--darken-4 font-weight-bold">
      Set New Password
    </h1>
    <FxUserSetPasswordForm ref="form" v-model="formData" :disabled="loading" />
    <v-btn
      height="50"
      depressed
      block
      color="primary"
      :loading="loading"
      class="mt-6"
      @click="send"
    >
      Set Password
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ConfirmPage',
  layout: 'startup',
  middleware: ({ error, route }) => {
    if (!route.query.signedUrl) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  data: () => ({
    formData: { password: '' },
    loading: false,
  }),

  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
    }),
  },

  methods: {
    async send () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()
      if (!isValid) {
        this.loading = false
        return
      }
      this.$axios.$post(this.$route.query.signedUrl, {
        password: this.formData.password,
      })
        .then(() => {
          this.$toast('Password has been set successfully!')
          this.$router.replace({ name: 'signin', query: { redirectTo: '/' } })
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

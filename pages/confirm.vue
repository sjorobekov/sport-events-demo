<template>
  <v-main>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card>
            <v-card-title>
              Password Setup
            </v-card-title>
            <v-card-text>
              <FxUserSetPasswordForm ref="form" v-model="formData" :disabled="loading" />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn depressed color="primary" :loading="loading" @click="send">
                Confirm
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'ConfirmPage',
  layout: 'empty',
  middleware: ({ error, route }) => {
    if (!route.query.signedUrl) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data: () => ({
    formData: { password: '' },
    loading: false,
  }),
  methods: {
    async send () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()
      if (!isValid) {
        this.loading = false
        return
      }
      this.$axios.$post(this.$route.query.signedUrl, this.formData)
        .then(() => {
          this.$toast('Password has been set successfully!')
          this.$router.replace({ name: 'login' })
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

<template>
  <div>
    <div v-if="success" class="text-center">
      <v-icon color="success" size="70">
        mdi-check-circle
      </v-icon>

      <h1 class="text-md-h1 text-h3s text-center mt-6">
        Your email has been confirmed!
      </h1>

      <v-btn
        class="mt-4"
        x-large
        depressed
        link
        :to="{ name: 'signin' }"
        color="primary"
      >
        Sign In
      </v-btn>
    </div>

    <div v-else class="text-center">
      <h1 class="text-h1 text-center mt-6">
        Unable to confirm your email :(
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmEmailPage',
  layout: 'startup',
  middleware: ({ error, route }) => {
    if (!route.query.signedUrl) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  data: () => ({
    loading: false,
    success: true,
  }),

  async fetch () {
    try {
      await this.$axios.$post(this.$route.query.signedUrl)
      this.success = true
    } catch (e) {
      this.success = false
    }
  },
}
</script>

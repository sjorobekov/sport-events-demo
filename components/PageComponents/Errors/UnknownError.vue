<template>
  <div class="error-container text-center d-flex justify-center align-center">
    <div>
      <h1 class="error-title mb-8">
        An error occurred
      </h1>

      <v-btn depressed color="primary" link :to="{ name: 'home' }">
        <v-icon>mdi-arrow-right</v-icon> Go to Sports Home
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnknownError',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped>
.error-container {
  max-width: 600px;
  margin: 0 auto;
  height: 90vh
}
.error-title {
  font-size: 5rem;
  line-height: 5rem;
}
</style>

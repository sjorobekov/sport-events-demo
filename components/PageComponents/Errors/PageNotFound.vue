<template>
  <div class="error-container text-center d-flex justify-center align-center">
    <div>
      <h1 class="error-title mb-8 neutral--text text--darken-4">
        Oops, <br><span class="primary--text">nothing</span> here...
      </h1>
      <p class="subtitle mb-2 neutral--text text--darken-3">
        Sorry, the page you're looking for can't be found.
      </p>
      <p class="subtitle mb-8 neutral--text text--darken-3">
        Try going back to the home page.
      </p>

      <v-btn
        depressed
        height="56"
        color="primary"
        class="text-center"
        link
        :to="{ name: 'home' }"
      >
        <v-icon>mdi-arrow-right</v-icon> Go to Sports Home
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
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
.subtitle {
  font-size: 18px;
  line-height: 24px;
}
</style>

<template>
  <div class="text-center ma-4">
    <v-icon color="brandgreen" size="64">
      mdi-check-circle
    </v-icon>

    <h1 class="text-h3 branddark--text mt-3 mb-2">
      Welcome to Fixturr
    </h1>

    <div class="text-p3 branddark--text text--lighten-1 mt-1 mb-8">
      Sign Up Complete. <br>
      We have sent you an email, please check inbox
    </div>

    <div class="mx-sm-auto sign-in-form">
      <v-btn
        type="submit"
        depressed
        color="brandgreen"
        dark
        height="50"
        block
        link
        :href="link"
        class="sign-up-button mb-4"
      >
        Go to Sports Dashboard
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpComplete',
  props: {
    link: {
      type: String,
      default: undefined,
    },
  },
}
</script>

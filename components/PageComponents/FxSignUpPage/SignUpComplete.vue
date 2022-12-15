<template>
  <div class="text-center">
    <v-icon color="success" size="70">
      mdi-check-circle
    </v-icon>

    <h1 class="text-h1 primary--text mt-3">
      Welcome to Fixturr
    </h1>

    <div class="text-p3 primary--text mt-1 mb-8">
      Sign Up Complete. <br>
      We have sent you an email, please check inbox
    </div>

    <div class="mx-sm-auto sign-in-form">
      <v-btn
        type="submit"
        depressed
        color="brand2"
        dark
        height="50"
        block
        link
        :href="link"
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

<style scoped>

.v-application .brand2 {
    background-color: #4368FA !important;
}

</style>

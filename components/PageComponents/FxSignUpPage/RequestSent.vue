<template>
  <div class="custom-width">
    <h1 class="text-h1 primary--text text-center mt-6">
      Request Sent
    </h1>

    <h2 class="text-p2 text-center primary--text mb-6">
      Your request to join Fixturr has been sent.
    </h2>

    <p class="text-p2 info--text text-center">
      The admin for {{ school.name }} has been sent a request to create an account for you.
      <br>
      <br>
      If no one at your school has signed up for Fixturr, or there is a problem with this request, please contact us at <a href="mailto: help@fixturr.com"> help@fixturr.com</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'RequestSent',
  props: {
    school: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style>
.custom-width {
  width:100%;
  max-width: 640px;
  margin: 0px auto;
}

</style>

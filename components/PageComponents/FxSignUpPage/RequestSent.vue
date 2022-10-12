<template>
  <div>
    <h1 class="text-h1 text-center mt-6">
      Request Sent
    </h1>

    <h2 class="text-p2 text-center info--text text--darken-2 mb-6">
      Your request to join Fixturr has been sent.
    </h2>

    <p class="text-p2 info--text text-center">
      The admin for {{ school.name }} has been sent a request to create an account for you.
      <br>
      If no one at your school has signed up for Fixturr, or there is a problem with this request, please contact us at help@fixturr.com
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

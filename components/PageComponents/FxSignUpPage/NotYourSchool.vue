<template>
  <div style="max-width: 506px" class="ma-7 mx-sm-auto">
    <v-img class="mx-auto mb-4" :src="img" width="58" />

    <h1 class="text-h3 text-center mb-2">
      Not Your School?
    </h1>

    <h2 class="text-p3 text-center info--text text--darken-2 mb-8">
      It looks like there has been a mistake.
    </h2>

    <p class="text-p3 info--text text--darken-2 text-center">
      Please check if anyone at your school has signed up to Fixturr.
    </p>
    <p class="text-p3 info--text text--darken-2 text-center">
      Contact us at help@fixturr.com and we will get back to you within 24 hours.
    </p>
  </div>
</template>

<script>
import img from './img/school.svg'

export default {
  name: 'NotYourSchool',
  data: () => ({
    img,
  }),
}
</script>

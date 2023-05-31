<template>
  <div style="max-width: 506px" class="ma-7 mx-sm-auto">
    <h1 class="text-h3 text-center branddark--text mb-2 mt-6">
      Not Your School?
    </h1>

    <h2 class="text-p3 text-center branddark--text text--lighten-1 mb-8">
      It looks like there has been a mistake.
    </h2>

    <p class="text-p2 branddark--text text--lighten-1 text-center mb-2">
      Please check if anyone at your school has signed up to Fixturr.
    </p>
    <p class="text-p2 branddark--text text--lighten-1 text-center">
      Contact us at <a href="mailto: help@fixturr.com"> help@fixturr.com</a> and we will get back to you within 24 hours.
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

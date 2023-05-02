<template>
  <v-img
    :height="size"
    :width="size"
    :src="value"
    :alt="alt"
  >
    <svg v-if="!value" viewBox="-27 -27 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M44.003 86.5607V6.86782C44.003 6.86782 64.3583 8.0262 79.8018 12.594C79.8018 12.594 79.6171 26.8541 79.6197 41.0016C79.6249 60.7171 62.1333 81.8171 44.0021 85.7392L44.003 86.5607ZM87.3332 7.4231C68.6401 1.88938 45.2107 0.333334 43.9998 0.333334C42.6534 0.333334 19.3591 1.88927 0.666504 7.4231C0.666504 7.4231 0.800285 24.684 0.795106 41.8112C0.79079 65.678 22.0497 90.9216 44.0003 95.6667C65.948 90.9212 87.1768 65.678 87.1723 41.8112C87.1689 24.684 87.3329 7.4231 87.3329 7.4231" :fill="color" />
    </svg>
  </v-img>
</template>

<script>

export default {
  name: 'FxSchoolLogo',
  props: {
    value: {
      type: String,
      default: undefined,
    },
    size: {
      type: [String, Number],
      default: undefined,
    },
    color: {
      type: String,
      default: 'brand',
    },
    alt: {
      type: String,
      default: undefined,
    },
  },
}
</script>

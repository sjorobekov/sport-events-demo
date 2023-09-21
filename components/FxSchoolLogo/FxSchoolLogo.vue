<template>
  <v-img
    :height="size"
    :width="size"
    :src="value"
    :alt="alt"
    class="overflow-visible"
  >
    <svg v-if="!value" class="icon" viewBox="0 0 144 144" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M144 72C144 111.765 111.765 144 72 144C32.2355 144 0 111.765 0 72C0 32.2355 32.2355 0 72 0C111.765 0 144 32.2355 144 72Z" fill="white" />
      <path d="M72.0031 111.819V33.6588C72.0031 33.6588 91.967 34.7949 107.113 39.2749C107.113 39.2749 106.932 53.2608 106.935 67.1362C106.94 86.4726 89.7847 107.167 72.0022 111.013L72.0031 111.819ZM114.5 34.2034C96.1664 28.7761 73.1875 27.25 72 27.25C70.6795 27.25 47.8332 28.776 29.5 34.2034C29.5 34.2034 29.6312 51.1324 29.6261 67.9302C29.6219 91.3381 50.472 116.096 72.0004 120.75C93.5261 116.096 114.347 91.3381 114.342 67.9302C114.339 51.1324 114.5 34.2034 114.5 34.2034" :fill="imgColor" />
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
  computed: {
    imgColor () {
      return this.color || '#333c4e'
    },
  },
}
</script>
<style scoped>
.icon {
  overflow: visible;
}
</style>

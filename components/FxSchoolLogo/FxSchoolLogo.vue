<template>
  <v-img
    v-if="value"
    :src="value"
    :alt="alt"
  />
  <v-icon v-else :color="color">
    $vuetify.icons.teams
  </v-icon>
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

<template>
  <v-dialog fullscreen :value="true" :transition="false" persistent>
    <v-card color="info lighten-3 mobile-dialog-card" tile>
      <slot name="default" />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'FxEventMobileContainer',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="sass">
@import '~vuetify/src/styles/styles.sass'

@media #{map-get($display-breakpoints, 'sm-and-down')}
  .mobile-dialog-card.v-card
    border: 0!important
    overflow: visible!important
  </style>

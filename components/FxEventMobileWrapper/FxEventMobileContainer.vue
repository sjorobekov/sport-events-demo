<template>
  <v-dialog fullscreen :value="true" :transition="false" persistent>
    <v-card color="background mobile-dialog-card" tile>
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
@import '~vuetify/src/styles/styles'

@media #{map-get($display-breakpoints, 'sm-and-down')}
  .mobile-dialog-card.v-card
    border: 0!important
    overflow: visible!important
</style>

<template>
  <v-dialog fullscreen :value="true" :transition="false">
    <v-card color="info lighten-3" tile>
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

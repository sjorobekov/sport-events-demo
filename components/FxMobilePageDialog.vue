<template>
  <v-dialog fullscreen :value="value">
    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="{ on, attrs }" />
    </template>
    <v-card color="background" class="mobile-dialog-card">
      <v-toolbar dark color="primary" flat height="72">
        <v-btn icon dark @click="$emit('click:back', $event)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer />
        <v-toolbar-title class="text-h6 pr-11 font-weight-bold">
          {{ title }}
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items />
      </v-toolbar>

      <div class="px-2 pt-6">
        <slot name="default" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'FxMobilePageDialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
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

<template>
  <v-dialog fullscreen :value="value">
    <v-card color="background dialog-toolbar">
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

      <div>
        <slot name="default" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'FxOpponentDialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Opponent Information',
    },
  },
}
</script>

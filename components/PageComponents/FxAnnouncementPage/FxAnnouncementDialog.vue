<template>
  <v-dialog fullscreen :value="value">
    <v-card color="info lighten-3">
      <v-toolbar dark color="primary" flat height="72">
        <v-btn icon dark @click="$emit('click:back', $event)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer />
        <v-toolbar-title class="text-h6 pr-11">
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
  name: 'FxAnnouncementDialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Announcement',
    },
  },
}
</script>

<template>
  <v-dialog fullscreen transition="dialog-bottom-transition" :value="value">
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="$emit('back')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items />
    </v-toolbar>

    <v-card tile color="info lighten-3" class="px-3 pt-5">
        <slot name="default" />
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

<template>
  <v-chip
    color="info lighten-2"
    outlined
    dark
    label
    class="pl-1 pr-3 radius-6 height-24"
  >
    <v-icon :color="color" class="mr-1" small>
      $vuetify.icons.ellipse
    </v-icon><span class="info--text text--darken-2 text-caption">{{ label }}</span>
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'
import { EVENTS, RESULTS, RESULTS_SCORES } from '~/enum/PublishResult'

export default Vue.extend({
  name: 'FxUserStatus',
  props: {
    publishTeam: {
      type: Boolean,
      required: true,
    },
    publishResults: {
      type: String,
      required: true,
    },
  },

  computed: {
    color (): string {
      if (!this.publishTeam) {
        return 'error'
      }

      if (this.publishResults === RESULTS_SCORES) {
        return 'success'
      }

      return 'warning lighten-1'
    },

    label (): string {
      if (!this.publishTeam) {
        return 'Not Visible'
      }

      if (this.publishResults === RESULTS_SCORES) {
        return 'Results & Scores'
      }

      if (this.publishResults === RESULTS) {
        return 'Results Only'
      }

      if (this.publishResults === EVENTS) {
        return 'Events Only'
      }

      return 'Unknown Privacy'
    },
  },
})
</script>

<style lang="scss" scoped>
.radius-6 {
  border-radius: 6px!important;
}
.height-24 {
  height: 24px!important;
}
</style>

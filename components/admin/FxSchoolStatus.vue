<template>
  <v-chip
    color="info lighten-2"
    outlined
    dark
    label
    class="pl-1 pr-3 radius-6"
  >
    <v-icon :color="color">
      $vuetify.icons.ellipse
    </v-icon><span class="info--text text--darken-2">{{ label }}</span>
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'

import { DateTime } from 'luxon'

export default Vue.extend({
  name: 'FxSchoolStatus',
  props: {
    portal: {
      type: Boolean,
      required: true,
    },
    lastActive: {
      type: String,
      default: undefined,
    },
  },

  computed: {
    color (): string {
      if (!this.portal) {
        return 'error'
      }

      if (!this.lastActive) {
        return 'info lighten-2'
      }

      if (this._is30daysPassed) {
        return 'warning lighten-1'
      }

      return 'success'
    },

    label (): string {
      if (this.color === 'error') {
        return 'Disabled'
      }

      if (this.color === 'success') {
        return 'Active'
      }

      return 'Inactive'
    },

    _is30daysPassed (): boolean {
      const date1 = DateTime.fromISO(this.lastActive)
      const date2 = DateTime.now()
      const { days } = date2.diff(date1, 'days')
      return days > 30
    },
  },
})
</script>

<style lang="scss" scoped>
.radius-6 {
  border-radius: 6px!important;
}
</style>

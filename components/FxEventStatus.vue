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
    </v-icon><span class="info--text text--darken-2 text-caption">{{ $t(`EVENT_RESULT.${overallResult}`) }}</span>
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'
import { EventResult } from '~/enum'

const COLOR_MAP = {
  [EventResult.LIVE]: 'error',
  [EventResult.TO_BE_PLAYED]: 'success',
}

export default Vue.extend({
  name: 'FxEventStatus',
  props: {
    overallResult: {
      type: String,
      required: true,
    },
  },

  computed: {
    color (): string {
      if (COLOR_MAP[this.overallResult]) {
        return COLOR_MAP[this.overallResult]
      }

      return 'success'
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

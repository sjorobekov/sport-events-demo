<template>
  <v-chip
    color="neutral lighten-1"
    outlined
    dark
    label
    class="pl-1 pr-3 radius-16 height-24"
  >
    <v-icon :color="color" class="mr-0" small>
      $vuetify.icons.ellipse
    </v-icon><span class="neutral--text text--darken-3 text-caption">{{ $t(`IN_HOUSE_EVENT_RESULT.${overallResult}`) }}</span>
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'
import { InHouseEventResult } from '~/enum'

const COLOR_MAP: Record<string, string> = {
  [InHouseEventResult.POSTPONED]: 'warning',
  [InHouseEventResult.TO_BE_PLAYED]: 'success',
  [InHouseEventResult.CANCELLED]: 'error darken1',
  [InHouseEventResult.SEE_MATCH_NOTES]: 'success',
  [InHouseEventResult.HOME]: 'success',
  [InHouseEventResult.DRAW]: 'info lighten1',
  [InHouseEventResult.AWAY]: 'error darken1',
}

export default Vue.extend({
  name: 'FxInHouseMatchStatus',
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

      return 'info'
    },
  },
})
</script>

<style lang="scss" scoped>
.radius-16 {
  border-radius: 16px!important;
}
.height-24 {
  height: 24px!important;
}
</style>

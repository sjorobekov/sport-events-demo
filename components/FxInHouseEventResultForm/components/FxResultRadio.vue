<template>
  <v-radio-group class="mt-0 pt-0" hide-details :value="value" @change="$emit('input', $event)">
    <v-row>
      <v-col cols="4" class="pl-lg-0 pr-2">
        <v-radio on-icon="mdi-check-circle" color="success" class="win radio rounded-l rounded-r px-2" :value="InHouseEventResult.HOME" label="Home" />
      </v-col>
      <v-col cols="4" class="pl-0 pr-2">
        <v-radio on-icon="mdi-check-circle" color="info lighten-2" class="draw radio rounded-l rounded-r py-4 px-2" :value="InHouseEventResult.DRAW" label="Draw" />
      </v-col>
      <v-col cols="4" class="pl-0 pr-3">
        <v-radio on-icon="mdi-check-circle" color="error" class="lost radio rounded-l rounded-r py-4 px-2" :value="InHouseEventResult.AWAY" label="Away" />
      </v-col>
    </v-row>
  </v-radio-group>
</template>

<script>
import { InHouseEventResult } from '@/enum'

export default {
  name: 'FxResultRadio',
  props: {
    value: {
      type: String,
      default: undefined,
    },
  },
  data: () => ({
    InHouseEventResult,
  }),
}
</script>

<style scoped lang="scss">
.radio {
  height: 52px;
  box-shadow: 0 0 0 1px var(--v-info-lighten2);
}

.radio.v-item--active {
  &.win {
    box-shadow: 0 0 0 2px var(--v-success-base);
  }
  &.draw {
    box-shadow: 0 0 0 2px var(--v-info-lighten1);
  }
  &.lost {
    box-shadow: 0 0 0 2px var(--v-error-base);
  }
}
</style>

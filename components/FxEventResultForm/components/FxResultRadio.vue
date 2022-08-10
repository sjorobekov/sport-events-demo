<template>
  <v-radio-group class="mt-0 pt-0" hide-details :value="value" @change="$emit('input', $event)">
    <v-row>
      <v-col cols="4">
        <v-radio on-icon="mdi-check-circle" color="success" class="win radio rounded-l rounded-r px-2" :value="EventResult.WIN" label="Win" />
      </v-col>
      <v-col cols="4">
        <v-radio on-icon="mdi-check-circle" color="info lighten-2" class="draw radio rounded-l rounded-r py-4 px-2" :value="EventResult.DRAW" label="Draw" />
      </v-col>
      <v-col cols="4">
        <v-radio on-icon="mdi-check-circle" color="error" class="lost radio rounded-l rounded-r py-4 px-2" :value="EventResult.LOST" label="Loss" />
      </v-col>
    </v-row>
  </v-radio-group>
</template>

<script>
import { EventResult } from '@/enum'

export default {
  name: 'FxResultRadio',
  props: {
    value: {
      type: String,
      default: undefined,
    },
  },
  data: () => ({
    EventResult,
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

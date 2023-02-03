<template>
  <div class="text-center">
    <v-alert v-if="isResultAcceptable" :style="style" class="ma-0 result-alert font-weight-bold">
      {{ $t(`EVENT_RESULT.${result}`) }}
    </v-alert>
    <v-alert v-else class="ma-0 result-alert font-weight-bold">
      ―
    </v-alert>
  </div>
</template>

<script>
import { EventResult } from '~/enum'

export default {
  name: 'FxEventResult',

  props: {
    result: {
      type: String,
      default: undefined,
    },
    size: {
      type: String,
      default: 'small',
    },
  },

  data: () => ({
    backgroundColor: {
      [EventResult.WIN]: 'var(--v-success-lighten5)',
      [EventResult.DRAW]: 'var(--v-info-lighten4)',
      [EventResult.LOST]: 'var(--v-error-lighten5)',
    },
    color: {
      [EventResult.WIN]: 'var(--v-success-darken3)',
      [EventResult.DRAW]: 'var(--v-info-darken3)',
      [EventResult.LOST]: 'var(--v-error-darken3)',
    },
  }),

  computed: {
    isResultAcceptable () {
      return [EventResult.WIN, EventResult.DRAW, EventResult.LOST].includes(this.result)
    },
    style () {
      return {
        color: this.color[this.result],
        'background-color': this.backgroundColor[this.result],
        'font-size': this.size === 'small' ? '1rem' : 'clamp(1rem, 2vw, 1.5rem)',
      }
    },
  },
}
</script>

<style scoped>
.result-alert {
  padding: 8px 16px;
}
</style>

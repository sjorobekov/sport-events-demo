<template>
  <div class="text-center">
    <v-alert v-if="isResultAcceptable" :color="backgroundColor[result]" :style="{color: color[result]}" class="ma-0 result-alert font-weight-bold">
      {{ $t(`EVENT_RESULT.${result}`) }}
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
  },

  data: () => ({
    backgroundColor: {
      [EventResult.WIN]: '#ECFDF5',
      [EventResult.DRAW]: '#F1F5F9',
      [EventResult.LOST]: '#FEF2F2',
    },
    color: {
      [EventResult.WIN]: '#065F46',
      [EventResult.DRAW]: '#1E293B',
      [EventResult.LOST]: '#991B1B',
    },
  }),

  computed: {
    isResultAcceptable () {
      return [EventResult.WIN, EventResult.DRAW, EventResult.LOST].includes(this.result)
    },
  },
}
</script>

<style scoped>
.result-alert {
  font-size: clamp(1rem, 2vw, 1.5rem);
  padding: 8px 16px;
}
</style>

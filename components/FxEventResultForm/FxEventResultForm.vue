<template>
  <component :is="form[eventType]" v-bind="$props" @input="$emit('input', $event)" @submit="$emit('submit', $event)" />
</template>

<script>
import { EventType } from '@/enum'

export default {
  name: 'FxEventResultForm',
  props: {
    eventType: {
      type: String,
      default: undefined,
    },
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    leftName: {
      type: String,
      default: undefined,
    },
    rightName: {
      type: String,
      default: undefined,
    },
  },

  data: () => ({
    form: {
      [EventType.FIXTURE]: 'FxEventFixtureResultForm',
      [EventType.MULTI_EVENT]: 'FxEventMultiResultForm',
      [EventType.TOURNAMENT]: 'FxEventTournamentResultForm',
    },
  }),
}
</script>

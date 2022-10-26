<template>
  <component :is="item[event.eventType]" v-bind="$props" />
</template>

<script>
import FixtureResult from './components/FixtureResult'
import TournamentResult from './components/TournamentResult'
import MultiEventResult from './components/MultiEventResult'
import { EventType } from '@/enum'

export default {
  name: 'ExistingResult',
  components: {
    FixtureResult,
    TournamentResult,
    MultiEventResult,
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
    me: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    item: {
      [EventType.FIXTURE]: 'FixtureResult',
      [EventType.MULTI_EVENT]: 'MultiEventResult',
      [EventType.TOURNAMENT]: 'TournamentResult',
    },
  }),
}
</script>

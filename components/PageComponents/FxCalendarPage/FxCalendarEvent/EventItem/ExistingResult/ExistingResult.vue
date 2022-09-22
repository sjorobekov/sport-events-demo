<template>
  <component :is="item[event.eventType]" v-bind="$props" />
</template>

<script>
import { EventType } from '@/enum'

import FixtureResult
  from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/EventItem/ExistingResult/components/FixtureResult'
import TournamentResult
  from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/EventItem/ExistingResult/components/TournamentResult'
import MultiEventResult
  from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/EventItem/ExistingResult/components/MultiEventResult'

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

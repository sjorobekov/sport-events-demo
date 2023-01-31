<template>
  <component :is="item[event.eventType]" />
</template>

<script>
import { mapGetters } from 'vuex'
import FxEventItemCard from '~/components/FxEventItemCard.vue'
import { EventType } from '@/enum'
import FixtureResult from '@/components/PageComponents/FxEventIndividualPage/FxEventExistingResult/components/FixtureResult'
import TournamentResult
  from '@/components/PageComponents/FxEventIndividualPage/FxEventExistingResult/components/TournamentResult'
import MultiEventResult
  from '@/components/PageComponents/FxEventIndividualPage/FxEventExistingResult/components/MultiEventResult'

export default {
  name: 'FxEventExistingResult',
  components: {
    FxEventItemCard,
    FixtureResult,
    TournamentResult,
    MultiEventResult,
  },

  data: () => ({
    item: {
      [EventType.FIXTURE]: 'FixtureResult',
      [EventType.MULTI_EVENT]: 'MultiEventResult',
      [EventType.TOURNAMENT]: 'TournamentResult',
    },
  }),

  computed: {
    ...mapGetters({
      event: 'page/event/event',
      contextSchool: 'context/school',
      myTeam: 'page/event/myTeam',
      opponentTeam: 'page/event/opponentTeam',
      result: 'page/event/result',
      hasResult: 'page/event/hasResult',
    }),
  },
}
</script>

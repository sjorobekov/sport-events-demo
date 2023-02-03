<template>
  <FxInHouseEventIndividualPage />
</template>

<script>
import FxInHouseEventIndividualPage from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventIndividualPage'

export default {
  name: 'InHouseEventIndividualPage',
  components: {
    FxInHouseEventIndividualPage,
  },

  async asyncData ({ store, route }) {
    await store.dispatch('page/inHouseEvent/fetchData', {
      inHouseCompetitionId: route.params.competitionId,
      inHouseMatchId: route.params.matchId,
    })
  },
}
</script>

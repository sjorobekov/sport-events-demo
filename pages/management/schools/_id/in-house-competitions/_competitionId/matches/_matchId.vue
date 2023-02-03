<template>
  <div>
    <FxInHouseEventIndividualPage />

    <v-row>
      <v-col
        class="pr-4 d-flex justify-start"
        :class="hasResult ? 'flex-column-reverse': 'flex-column'"
      >
        <FxInHouseEventDetails />
        <FxInHouseEventResults id="results" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxInHouseEventIndividualPage from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventIndividualPage'
import FxInHouseEventResults from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventResults'
import FxInHouseEventDetails from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventDetails'

export default {
  name: 'InHouseEventIndividualPage',
  components: {
    FxInHouseEventIndividualPage,
    FxInHouseEventResults,
    FxInHouseEventDetails,
  },

  async asyncData ({ store, route }) {
    await store.dispatch('page/inHouseEvent/fetchData', {
      inHouseCompetitionId: route.params.competitionId,
      inHouseMatchId: route.params.matchId,
    })
  },

  computed: {
    ...mapGetters({
      hasResult: 'page/inHouseEvent/hasResult',
    }),
  },
}
</script>

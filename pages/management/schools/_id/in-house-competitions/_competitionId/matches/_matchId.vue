<template>
  <div>
    <FxInHouseEventIndividualPage :competition-id="competitionId" :match-id="matchId" />

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

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      inHouseEvent: 'page/inHouseEvent/inHouseEvent',
      hasResult: 'page/inHouseEvent/hasResult',
      teams: 'page/inHouseEvent/teams',
    }),

    competitionId () {
      return this.$route.params.competitionId
    },

    matchId () {
      return this.$route.params.matchId
    },
  },
}
</script>

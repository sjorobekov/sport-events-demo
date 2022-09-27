<template>
  <FxInHouseEventIndividualPage :competition-id="competitionId" :match-id="matchId" />
</template>

<script>
import { mapGetters } from 'vuex'
import FxInHouseEventIndividualPage from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventIndividualPage'

export default {
  name: 'InHouseEventIndividualPage',
  components: {
    FxInHouseEventIndividualPage,
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
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

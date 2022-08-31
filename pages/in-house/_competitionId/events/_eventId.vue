<template>
  <FxInHouseEventIndividualPage :competition-id="competitionId" :event-id="eventId" />
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

    eventId () {
      return this.$route.params.eventId
    },
  },
}
</script>

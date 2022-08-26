<template>
  <FxInHouseEventIndividualPage :in-house-event-id="inHouseEventId" />
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

    inHouseEventId () {
      return this.$route.params.inHouseEventId
    },
  },
}
</script>

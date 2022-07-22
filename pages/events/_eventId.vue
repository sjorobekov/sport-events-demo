<template>
  <FxEventIndividualPage :event-id="eventId" />
</template>

<script>
import { mapGetters } from 'vuex'
import FxEventIndividualPage from '@/components/PageComponents/FxEventIndividualPage/FxEventIndividualPage'

export default {
  name: 'EventIndividualPage',
  components: {
    FxEventIndividualPage,
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),

    eventId () {
      return this.$route.params.eventId
    },
  },
}
</script>

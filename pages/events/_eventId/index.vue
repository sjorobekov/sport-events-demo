<template>
  <FxEventTabulatedContent :is-pending-result="isPendingResult" :show-tabs="isMobile">
    <template #details>
      <FxEventDetails />
    </template>
    <template v-if="showResultsCard" #results>
      <FxEventResults id="results" />
    </template>
    <template #teamSheet>
      <FxEventTeamSheet />
    </template>
    <template v-if="sportLocation" #map>
      <FxMap :coordinates="sportLocation.coordinates" />
    </template>
  </FxEventTabulatedContent>
</template>

<script>
import { mapGetters } from 'vuex'
import FxEventTeamSheet from '@/components/PageComponents/FxEventIndividualPage/FxEventTeamSheet/FxEventTeamSheet'
import FxEventResults from '@/components/PageComponents/FxEventIndividualPage/FxEventResults'
import FxEventDetails from '@/components/PageComponents/FxEventIndividualPage/FxEventDetails'
import FxMap from '@/components/PageComponents/FxEventIndividualPage/FxMap'
import FxEventTabulatedContent from '@/components/PageComponents/FxEventIndividualPage/components/FxEventTabulatedContent'

export default {
  name: 'EventIndexPage',
  components: {
    FxEventTabulatedContent,
    FxEventTeamSheet,
    FxEventResults,
    FxEventDetails,
    FxMap,
  },
  computed: {
    ...mapGetters({
      sportLocation: 'page/event/sportLocation',
      isPendingResult: 'page/event/isPendingResult',
      hasScore: 'page/event/hasScore',
      canAddOrEditResult: 'page/event/canAddOrEditResult',
      canHaveResult: 'page/event/canHaveResult',
    }),

    showResultsCard () {
      return this.hasScore || (this.canHaveResult && this.canAddOrEditResult)
    },

    isMobile () {
      if (process.client) {
        return this.$vuetify.breakpoint.smAndDown
      }

      return this.isMobileDevice || this.isTabletDevice
    },
  },
}
</script>

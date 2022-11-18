<template>
  <v-row>
    <v-col
      cols="12"
      sm="12"
      md="12"
      lg="7"
      class="pr-4 d-flex justify-start"
      :class="isPendingResult ? 'flex-column' : 'flex-column-reverse'"
    >
      <FxEventDetails />
      <FxEventResults v-if="showResultsCard" id="results" />
    </v-col>
    <v-col cols="12" sm="12" md="12" lg="5">
      <FxEventTeamSheet />
      <FxMap v-if="sportLocation" :coordinates="sportLocation.coordinates" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import FxEventTeamSheet from '@/components/PageComponents/FxEventIndividualPage/FxEventTeamSheet/FxEventTeamSheet'
import FxEventResults from '@/components/PageComponents/FxEventIndividualPage/FxEventResults'
import FxEventDetails from '@/components/PageComponents/FxEventIndividualPage/FxEventDetails'
import FxMap from '@/components/PageComponents/FxEventIndividualPage/FxMap'

export default {
  name: 'EventIndexPage',
  components: {
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
  },
}
</script>

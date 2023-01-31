<template>
  <FxInHouseEventTabulatedContent :show-tabs="isMobile" :is-pending-result="!hasResult">
    <template #details>
      <FxInHouseEventDetails />
    </template>

    <template v-if="showResultsCard" #results>
      <FxInHouseEventResults id="results" />
    </template>

    <template #teamSheet>
      <FxInHouseEventTeamSheet
        v-for="team in teams"
        :key="team.id"
        :team="team"
      />
    </template>
  </FxInHouseEventTabulatedContent>
</template>

<script>
import { mapGetters } from 'vuex'
import FxInHouseEventTeamSheet from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventTeamSheet'
import FxInHouseEventResults from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventResults'
import FxInHouseEventDetails from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventDetails'
import FxInHouseEventTabulatedContent
  from '~/components/PageComponents/FxInHouseEventIndividualPage/components/FxInHouseEventTabulatedContent.vue'

export default {
  name: 'InHouseEventIndexPage',
  components: {
    FxInHouseEventTabulatedContent,
    FxInHouseEventTeamSheet,
    FxInHouseEventResults,
    FxInHouseEventDetails,
  },
  data: () => ({
    sheets: [],
  }),
  computed: {
    ...mapGetters({
      inHouseEvent: 'page/inHouseEvent/inHouseEvent',
      teams: 'page/inHouseEvent/teams',
      isMobileDevice: 'context/isMobile',
      isTabletDevice: 'context/isTablet',
      hasResult: 'page/inHouseEvent/hasResult',
      canAddOrEditResult: 'page/inHouseEvent/canAddOrEditResult',
    }),

    isMobile () {
      if (process.client) {
        return this.$vuetify.breakpoint.smAndDown
      }

      return this.isMobileDevice || this.isTabletDevice
    },

    showResultsCard () {
      return this.hasResult || this.canAddOrEditResult
    },
  },
}
</script>

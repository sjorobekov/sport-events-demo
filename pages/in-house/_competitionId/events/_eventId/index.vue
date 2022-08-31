<template>
  <v-row>
    <v-col
      cols="12"
      sm="12"
      md="12"
      lg="7"
      class="pr-4 d-flex"
      :class="hasResult ? 'flex-column-reverse': 'flex-column'"
    >
      <FxInHouseEventDetails v-for="match in matches" :key="match.id" :match="match" />
      <FxInHouseEventResults id="results" />
    </v-col>
    <v-col cols="12" sm="12" md="12" lg="5">
      <FxInHouseEventTeamSheet />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import FxInHouseEventTeamSheet from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventTeamSheet'
import FxInHouseEventResults from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventResults'
import FxInHouseEventDetails from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventDetails'

export default {
  name: 'EventIndexPage',
  components: {
    FxInHouseEventTeamSheet,
    FxInHouseEventResults,
    FxInHouseEventDetails,
  },
  computed: {
    ...mapGetters({
      hasResult: 'page/inHouseEvent/hasResult',
      matches: 'page/inHouseEvent/matches',
    }),
  },
}
</script>

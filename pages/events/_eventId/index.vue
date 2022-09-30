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
      <FxEventDetails />
      <FxEventResults id="results" />
    </v-col>
    <v-col cols="12" sm="12" md="12" lg="5">
      <FxEventTeamSheet />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import FxEventTeamSheet from '@/components/PageComponents/FxEventIndividualPage/FxEventTeamSheet/FxEventTeamSheet'
import FxEventResults from '@/components/PageComponents/FxEventIndividualPage/FxEventResults'
import FxEventDetails from '@/components/PageComponents/FxEventIndividualPage/FxEventDetails'

export default {
  name: 'EventIndexPage',
  components: {
    FxEventTeamSheet,
    FxEventResults,
    FxEventDetails,
  },
  computed: {
    ...mapGetters({
      hasResult: 'page/event/hasResult',
    }),
  },
}
</script>

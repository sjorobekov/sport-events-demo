<template>
  <div class="text-center">
    <div v-if="!isLoggedIn && isResultsOnly" class="pa-2 px-md-5 py-md-2 score-result font-weight-bold ma-0">
      <FxEventResult :result="result.overallResult" size="big" />
    </div>

    <v-alert v-else-if="!isLoggedIn && isEventsOnly" class="pa-2 px-md-5 py-md-2 score-result font-weight-bold ma-0" color="#F1F5F9">
      ―
    </v-alert>

    <v-alert v-else-if="hasScore" class="pa-2 px-md-5 py-md-2 score-result font-weight-bold ma-0" color="#F1F5F9">
      {{ score }} - {{ opponentScore }}
    </v-alert>

    <v-alert v-else-if="isCancelled" color="error darken-1" class="ma-0 score-alert font-weight-bold" outlined>
      Cancelled
    </v-alert>

    <v-alert v-else-if="isPostponed" color="warning lighten-2" outlined class="ma-0 score-alert font-weight-bold">
      <span class="error--text">Postponed</span>
    </v-alert>

    <v-alert v-else-if="hasResult" color="#F1F5F9" class="ma-0 score-alert font-weight-bold">
      {{ $t(`EVENT_RESULT.${result.overallResult}`) }}
    </v-alert>

    <v-btn v-else-if="!hasResult && canAddOrEditResult" color="primary" @click="$vuetify.goTo(target, options)">
      <v-icon>mdi-plus-circle-outline</v-icon> Add Result
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { PublishResult } from '@/enum'
import FxEventResult from '@/components/FxEventResult'

export default {
  name: 'FxEventResultCenterBoard',
  components: {
    FxEventResult,
  },

  data: () => ({
    easing: 'easeInOutCubic',
    duration: 300,
    offset: 0,
  }),

  computed: {
    ...mapGetters({
      result: 'page/event/result',
      isCancelled: 'page/event/isCancelled',
      isPostponed: 'page/event/isPostponed',
      hasResult: 'page/event/hasResult',
      hasScore: 'page/event/hasScore',
      canAddOrEditResult: 'page/event/canAddOrEditResult',
      isLoggedIn: 'context/isLoggedIn',
      myTeam: 'page/event/myTeam',
    }),

    target () {
      return '#results'
    },

    options () {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      }
    },

    score () {
      return this.result?.results[0]?.score
    },

    opponentScore () {
      return this.result?.results[0]?.opponentScore
    },

    isResultsOnly () {
      return PublishResult.RESULTS === this.myTeam?.publishResults
    },

    isEventsOnly () {
      return PublishResult.EVENTS === this.myTeam?.publishResults
    },
  },
}
</script>

<style scoped lang="sass">
@import '~vuetify/src/styles/styles.sass'

.score-result
  font-size: 2rem

.score-alert
  font-size: clamp(1rem, 2vw, 1.5rem)

@media #{map-get($display-breakpoints, 'sm-and-down')}
  .score-result
    font-size: 1rem

</style>

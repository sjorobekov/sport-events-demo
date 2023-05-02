<template>
  <div class="text-center">
    <v-alert v-if="hasScore" class="pa-2 px-md-5 py-md-2 score-result font-weight-bold ma-0 neutral--text text--darken-4" color="#edf0f3">
      {{ score }} - {{ opponentScore }}
    </v-alert>

    <v-alert v-else-if="hasResult" class="ma-0 score-alert font-weight-bold neutral--text text--darken-4" color="#edf0f3">
      {{ $t(`IN_HOUSE_EVENT_RESULT.${result.overallResult}`) }}
    </v-alert>

    <v-btn v-else-if="!hasResult && canAddOrEditResult" color="primary" @click="$vuetify.goTo(target, options)">
      <v-icon>mdi-plus-circle-outline</v-icon> Add Result
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FxInHouseEventResultCenterBoard',

  data: () => ({
    easing: 'easeInOutCubic',
    duration: 300,
    offset: 0,
  }),

  computed: {
    ...mapGetters({
      result: 'page/inHouseEvent/result',
      hasResult: 'page/inHouseEvent/hasResult',
      hasScore: 'page/inHouseEvent/hasScore',
      canAddOrEditResult: 'page/inHouseEvent/canAddOrEditResult',
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
      return this.result?.homeScore
    },

    opponentScore () {
      return this.result?.awayScore
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

<template>
  <div class="text-center">
    <v-alert v-if="hasScore" class="pa-2 px-md-5 py-md-2 score-result ma-0" color="#F1F5F9">
      {{ score }} - {{ opponentScore }}
    </v-alert>

    <v-alert v-else-if="isCancelled" color="error darken-1" class="ma-0 score-alert" outlined>
      Cancelled
    </v-alert>

    <v-alert v-else-if="isPostponed" color="warning lighten-2" outlined class="ma-0 score-alert">
      <span class="error--text">Postponed</span>
    </v-alert>

    <v-alert v-else-if="hasResult" color="#F1F5F9" class="ma-0 score-alert">
      {{ $t(`EVENT_RESULT.${result.overallResult}`) }}
    </v-alert>

    <v-btn v-else-if="!hasResult && canAddOrEditResult" color="primary" @click="$vuetify.goTo(target, options)">
      <v-icon>mdi-plus-circle-outline</v-icon> Add Result
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FxEventResultCenterBoard',

  data: () => ({
    easing: 'easeInOutCubic',
    duration: 300,
    offset: 0,
  }),

  computed: {
    ...mapGetters({
      result: 'page/event/result',
      isPlayed: 'page/event/isPlayed',
      isCancelled: 'page/event/isCancelled',
      isPostponed: 'page/event/isPostponed',
      hasResult: 'page/event/hasResult',
      hasScore: 'page/event/hasScore',
      canAddOrEditResult: 'page/event/canAddOrEditResult',
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
  },
}
</script>

<style scoped>
.score-result {
  font-size:3vw;
  font-weight: bold
}
.score-alert {
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: bold
}
</style>

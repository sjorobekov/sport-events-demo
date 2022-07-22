<template>
  <div>
    <v-btn v-if="isPendingResult" color="primary" @click="$vuetify.goTo(target, options)">
      <v-icon>mdi-plus-circle-outline</v-icon> Add Result
    </v-btn>

    <v-alert v-else-if="isCancelled" color="error darken-1" outlined class="text-h5">
      Cancelled
    </v-alert>
    <v-alert v-else-if="isPostponed" color="warning lighten-2" outlined>
      <span class="text-h5 error--text">Postponed</span>
    </v-alert>
    <v-alert v-else-if="hasResult" class="text-h1" color="#F1F5F9">
      {{ score }} - {{ opponentScore }}
    </v-alert>
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
      isPendingResult: 'page/event/isPendingResult',
      hasResult: 'page/event/hasResult',
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
      console.log('this.result?.results[0]?.score', this.result?.results[0]?.score)
      return this.result?.results[0]?.score
    },

    opponentScore () {
      console.log('this.result?.results[0]?.opponentScore', this.result?.results[0]?.opponentScore)

      return this.result?.results[0]?.opponentScore
    },
  },
}
</script>

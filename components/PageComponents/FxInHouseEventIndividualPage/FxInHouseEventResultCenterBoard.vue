<template>
  <v-row class="fill-height" justify="center" align="center">
    <v-col>
      <v-alert v-if="hasScore" class="text-h1" color="#F1F5F9">
        {{ score }} - {{ opponentScore }}
      </v-alert>

      <v-alert v-else-if="hasResult" class="text-h1" color="#F1F5F9">
        {{ $t(`EVENT_RESULT.${result.overallResult}`) }}
      </v-alert>

      <v-btn v-else-if="!hasResult && canAddOrEditResult" color="primary" @click="$vuetify.goTo(target, options)">
        <v-icon>mdi-plus-circle-outline</v-icon> Add Result
      </v-btn>

      <v-alert v-else-if="isCancelled" color="error darken-1" outlined class="text-h5">
        Cancelled
      </v-alert>

      <v-alert v-else-if="isPostponed" color="warning lighten-2" outlined>
        <span class="text-h5 error--text">Postponed</span>
      </v-alert>
    </v-col>
  </v-row>
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

<template>
  <v-row class="fill-height" justify="center" align="center">
    <v-col>
      <v-alert v-if="hasScore" class="text-h1" color="#F1F5F9">
        {{ score }} - {{ opponentScore }}
      </v-alert>

      <v-alert v-else-if="hasResult" class="text-h1" color="#F1F5F9">
        {{ $t(`IN_HOUSE_EVENT_RESULT.${result.overallResult}`) }}
      </v-alert>

      <v-btn v-else-if="!hasResult && canAddOrEditResult" depressed color="primary" @click="$vuetify.goTo(target, options)">
        <v-icon>mdi-plus-circle-outline</v-icon> Add Result
      </v-btn>
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

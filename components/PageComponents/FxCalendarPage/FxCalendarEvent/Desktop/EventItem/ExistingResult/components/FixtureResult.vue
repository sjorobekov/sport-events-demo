<template>
  <div v-if="!isLoggedIn && isResultsOnly">
    <FxEventResult :result="me.overallResult" />
  </div>
  <div v-else-if="!isLoggedIn && isEventsOnly" style="width: 120px">
    <v-avatar rounded size="40" class="mr-2" color="info lighten-4">
      -
    </v-avatar>
    <v-avatar rounded size="40" class="ml-2" color="info lighten-4">
      -
    </v-avatar>
  </div>
  <div v-else style="width: 120px">
    <v-avatar rounded size="40" class="mr-2" color="info lighten-4">
      {{ left }}
    </v-avatar>
    <v-avatar rounded size="40" class="ml-2" color="info lighten-4">
      {{ right }}
    </v-avatar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxEventResult from '~/components/FxEventResult'
import { PublishResult } from '@/enum'

export default {
  name: 'FixtureResult',
  components: {
    FxEventResult,
  },

  props: {
    me: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'context/isLoggedIn',
    }),
    left () {
      if (!this.me.results) {
        return 0
      }
      return this.me.results[0].score
    },
    right () {
      if (!this.me.results) {
        return 0
      }
      return this.me.results[0].opponentScore
    },
    myTeam () {
      return this.me.team
    },
    isResultsOnly () {
      return PublishResult.RESULTS === this.myTeam.publishResults
    },
    isEventsOnly () {
      return PublishResult.EVENTS === this.myTeam.publishResults
    },
  },
}
</script>

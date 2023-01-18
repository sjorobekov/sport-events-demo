<template>
  <div v-if="!isLoggedIn && isResultsOnly" class=" text-no-wrap px-2">
    <FxEventResult :result="me.overallResult" />
  </div>
  <div v-else-if="!isLoggedIn && isEventsOnly" class="result text-no-wrap px-2">
    –
  </div>
  <div v-else class="result text-no-wrap px-2">
    {{ overallResult }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxEventResult from '~/components/FxEventResult'
import { PublishResult } from '@/enum'

export default {
  name: 'TournamentResult',
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
    overallResult () {
      return this.$t(`EVENT_RESULT.${this.me.overallResult}`)
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

<style scoped>
.result {
  height: 40px;
  line-height: 40px;
  background: var(--v-info-lighten4)
}
</style>

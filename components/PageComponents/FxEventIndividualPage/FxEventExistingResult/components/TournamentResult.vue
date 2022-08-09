<template>
  <div>
    <v-list v-if="result.resultNotes">
      <v-list-item style="height: 24px; min-height: initial">
        <v-list-item-content class="text-caption pa-0">
          Tournament Notes
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="border-bottom">
        <v-list-item-content class="text-p2">
          {{ result.resultNotes }}
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <TournamentResultItem v-for="(item, i) in result.results" :key="i" :item="item" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TournamentResultItem
  from '@/components/PageComponents/FxEventIndividualPage/FxEventExistingResult/components/TournamentResultItem'

export default {
  name: 'TournamentResult',
  components: {
    TournamentResultItem,
  },
  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
      myTeam: 'page/event/myTeam',
      opponentTeam: 'page/event/opponentTeam',
      result: 'page/event/result',
      hasResult: 'page/event/hasResult',
    }),
  },
}
</script>

<style scoped>
.result-box {
  border-radius: 6px;
  padding: 2px 8px 2px 8px;
  color: var(--v-info-darken1);
  box-shadow: 0 0 0 1px var(--v-info-lighten1);
}
</style>

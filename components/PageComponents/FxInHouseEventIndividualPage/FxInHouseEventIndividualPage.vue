<template>
  <div>
    <v-card v-if="$fetchState.pending">
      <v-skeleton-loader
        type="card-avatar, article, actions"
      />
    </v-card>
    <template v-else>
      <v-card class="rounded-b-0" color="primary" dark height="80">
        <v-list-item>
          <v-list-item-action />

          <v-list-item-content class="text-center pl-14 pt-5">
            <v-list-item-title class="text-subheading mb-1">
              <FxDateFormat :date="match.date" output-format="cccc dd MMMM yyyy" />
            </v-list-item-title>
            <v-list-item-subtitle class="text-p2 white--text">
              {{ sport.name }} &#x2022; In-House Sport
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <div>
              <v-btn icon>
                <v-icon>mdi-printer-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-card>
      <FxInHouseEventScoreBoardCard />
      <NuxtChild />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxInHouseEventScoreBoardCard from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventScoreBoardCard'

export default {
  name: 'FxInHouseEventIndividualPage',
  components: {
    FxInHouseEventScoreBoardCard,
  },
  props: {
    competitionId: {
      type: String,
      default: undefined,
    },
    matchId: {
      type: String,
      default: undefined,
    },
  },

  async fetch () {
    await this.$store.dispatch('page/inHouseEvent/fetchData', {
      inHouseCompetitionId: this.competitionId,
      inHouseMatchId: this.matchId,
    })
  },

  computed: {
    ...mapGetters({
      inHouseEvent: 'page/inHouseEvent/inHouseEvent',
      sport: 'page/inHouseEvent/sport',
      match: 'page/inHouseEvent/inHouseMatch',
    }),
  },
}
</script>

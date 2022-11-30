<template>
  <div>
    <v-row class="mb-2">
      <v-col cols="12" sm="5" md="5">
        <h1 class="text-h3">
          In-House Sport
        </h1>
      </v-col>
      <v-col cols="6" sm="3" md="3">
        <v-select
          id="season"
          v-model="params.seasonId"
          style="max-width: 120px"
          outlined
          dense
          :items="seasons"
          item-text="name"
          item-value="id"
          placeholder="Select Season"
          hide-details
          @change="onSeasonChange"
        />
      </v-col>
      <v-col v-if="canCreateTeam" cols="6" sm="4" md="4" class="text-right">
        <v-btn depressed color="primary" link :to="{ name: 'in-house-add' }">
          <v-icon>$vuetify.icons.plusOutline</v-icon>
          Add Competition
        </v-btn>
      </v-col>
    </v-row>
    <FxSportExpansionPanel v-for="sport in sports" :key="sport.id" class="mb-4" :item="sport" :subtitle="$tc('page.InHouse.COMPETITIONS', competitionBySport[sport.id].length)">
      <v-list class="py-0">
        <v-list-item v-for="competition in competitionBySport[sport.id]" :key="competition.id" style="border-bottom: 1px solid #F1F5F9">
          <v-list-item-content>
            <v-list-item-title class="info--text text--darken-2 text-h5s">
              {{ competition.name }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn outlined link :to="{ name: 'in-house-competitionId-matches', params: { competitionId: competition.id } }">
              View Competition
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </FxSportExpansionPanel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'InHousePage',

  data: () => ({
    params: {},
    sports: [],
    competitionBySport: {},
  }),

  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
      seasons: 'seasons/all',
      currentSeason: 'seasons/current',
      canCreateTeam: 'user/acl/canCreateTeam',
    }),
  },

  created () {
    this.params = {
      seasonId: this.currentSeason.id,
    }
    this.onSeasonChange()
  },

  methods: {
    async onSeasonChange () {
      const inHouseCompetitions = await this.$store.dispatch('api/inHouseCompetitions/list', {
        schoolId: this.contextSchool.id,
        params: this.params,
      })

      const sports = []
      this.competitionBySport = {}
      inHouseCompetitions.forEach((competition) => {
        if (!this.competitionBySport[competition.sportId]) {
          this.$set(this.competitionBySport, competition.sportId, [])
        }
        this.competitionBySport[competition.sportId].push(competition)
        sports.push(competition.sport)
      })
      this.sports = [...new Map(sports.map(v => [v.id, v])).values()]
    },
  },
}
</script>

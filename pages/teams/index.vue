<template>
  <div>
    <v-row class="mb-2">
      <v-col cols="6" sm="6" md="4">
        <h1 class="text-h3">
          Teams
        </h1>
      </v-col>
      <v-col cols="6" sm="6" md="4">
        <v-autocomplete
          id="season"
          v-model="params.seasonId"
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
      <v-col v-if="canCreateTeam" cols="12" sm="12" md="4" class="text-right">
        <v-btn depressed color="primary" link :to="{ name: 'teams-add' }">
          <v-icon>$vuetify.icons.plusOutline</v-icon>
          Add Team
        </v-btn>
      </v-col>
    </v-row>
    <FxSportExpansionPanel v-for="sport in sports" :key="sport.id" class="mb-4" :item="sport" :subtitle="subtitle(teamsBySport[sport.id].length)">
      <v-list class="py-0">
        <v-list-item v-for="team in teamsBySport[sport.id]" :key="team.id" style="border-bottom: 1px solid #F1F5F9">
          <v-list-item-content>
            <v-list-item-title class="info--text text--darken-2 text-h5s">
              {{ team.name }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="info--text">
              {{ team.coach.firstname }} {{ team.coach.lastname }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn outlined link :to="{ name: 'teams-id', params: { id: team.id } }">
              View Team
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
  name: 'TeamsPage',

  data: () => ({
    params: {},
    sports: [],
    teamsBySport: {},
  }),

  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
      seasons: 'seasons/all',
      currentSeason: 'seasons/current',
      canCreateTeam: 'user/acl/canCreateTeam',
    }),

    subtitle: () => (number) => {
      if (number === 1) {
        return '1 Team'
      }
      if (number > 1) {
        return `${number} Teams`
      }

      return 'No Teams'
    },
  },

  created () {
    this.params = {
      seasonId: this.currentSeason.id,
    }
    this.onSeasonChange()
  },

  methods: {
    async onSeasonChange () {
      const teams = await this.$store.dispatch('api/teams/list', {
        schoolId: this.contextSchool.id,
        params: this.params,
      })

      const sports = []
      this.teamsBySport = {}

      teams.forEach((team) => {
        if (!this.teamsBySport[team.sportId]) {
          this.$set(this.teamsBySport, team.sportId, [])
        }
        this.teamsBySport[team.sportId].push(team)
        sports.push(team.sport)
      })

      this.sports = [...new Map(sports.map(v => [v.id, v])).values()]
        .sort((a, b) => {
          return a.name > b.name ? 1 : -1
        })
    },
  },
}
</script>

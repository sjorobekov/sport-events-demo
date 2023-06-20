<template>
  <div>
    <v-row class="mb-2 align-center">
      <v-col v-if="canCreateTeam" cols="7" sm="5" md="5">
        <h1 class="neutral--text text--darken-4 text-h4 text-md-h3 font-weight-bold">
          In-House Sport
        </h1>
      </v-col>
      <v-col v-else cols="7" sm="9" md="10">
        <h1 class="text-h4 text-md-h3 neutral--text text--darken-4 font-weight-bold">
          In-House Sport
        </h1>
      </v-col>
      <v-col v-if="canCreateTeam" cols="5" sm="3" class="d-flex" :class="{ 'justify-end': isMobile }">
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
      <v-col v-else cols="5" sm="3" md="2">
        <v-select
          id="season"
          v-model="params.seasonId"
          style="min-width: 120px"
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
      <v-col v-if="canCreateTeam" cols="12" sm="4" md="4" class="text-right">
        <v-btn
          depressed
          color="primary"
          link
          :block="isMobile"
          :x-large="isMobile"
          :to="{ name: 'in-house-add' }"
        >
          <v-icon>$vuetify.icons.add-all</v-icon>
          Add Competition
        </v-btn>
      </v-col>
    </v-row>
    <template v-if="!$fetchState.pending && !sports.length">
      <v-col class="d-flex flex-column justify-center align-center pt-4 pt-md-12">
        <v-img width="100" :src="noData" class="mb-3" />
        <div class="text-p3 text-center neutral--text text--darken-3 mb-2 mt-2">
          No In-House Competitions Found For The Selected Season.
        </div>
        <div class="text-p2 text-center neutral--text text--darken-3 mb-2" style="width:320px">
          Try selecting a different season.
        </div>
      </v-col>
    </template>
    <template v-else>
      <FxSportExpansionPanel v-for="sport in sports" :key="sport.id" class="mb-4" :item="sport" :subtitle="$tc('page.InHouse.COMPETITIONS', competitionBySport[sport.id].length)">
        <v-list class="py-0">
          <v-list-item v-for="competition in competitionBySport[sport.id]" :key="competition.id" style="border-bottom: 1px solid #F1F5F9">
            <v-list-item-content>
              <v-list-item-title class="neutral--text text--darken-4 text-h5s">
                {{ competition.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn outlined :ripple="false" class="neutral--text text--darken-2" link :to="{ name: 'in-house-competitionId-matches', params: { competitionId: competition.id } }">
                View Competition
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </FxSportExpansionPanel>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import noData from './noData.svg'

export default {
  name: 'InHousePage',

  data: () => ({
    params: {},
    sports: [],
    competitionBySport: {},
    noData,
  }),

  async fetch () {
    this.params = {
      seasonId: this.currentSeason.id,
    }
    await this.onSeasonChange()
  },

  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
      seasons: 'seasons/all',
      currentSeason: 'seasons/current',
      canCreateTeam: 'user/acl/canCreateTeam',
      isMobileDevice: 'context/isMobile',
    }),

    isMobile () {
      if (process.client) {
        return this.$vuetify.breakpoint.xsOnly
      }

      return this.isMobileDevice
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
      this.sports = [...new Map(sports.map(v => [v.id, v])).values()].sort((a, b) => a.name.localeCompare(b.name))
    },
  },
}
</script>

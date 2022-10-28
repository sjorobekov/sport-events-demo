<template>
  <div>
    <v-row>
      <v-col md="9">
        <v-card v-if="inHouseCompetition.photo">
          <v-img
            class="white--text align-end"
            height="388px"
            gradient="to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)"
            :src="inHouseCompetition.photo"
          >
            <v-list-item dark>
              <v-list-item-content>
                <v-list-item-title class="text-h3">
                  {{ inHouseCompetition.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-subheading font-weight-bold white--text">
                  In-House Sport &bull; {{ sport.name }} &bull; {{ season.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-img>
        </v-card>
        <v-list-item v-else>
          <v-list-item-content>
            <v-list-item-title class="text-h3">
              {{ inHouseCompetition.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-subheading font-weight-bold">
              In-House Sport &bull; {{ sport.name }} &bull; {{ season.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-row class="my-4">
          <v-col cols="6" sm="5" md="6">
            <v-chip-group
              v-model="filter"
              mandatory
              class="float-left"
              active-class="primary white--text"
            >
              <v-chip class="info--text" :value="null">
                All
              </v-chip>

              <v-chip class="info--text" value="fixtures">
                Fixtures
              </v-chip>

              <v-chip class="info--text" value="results">
                Results
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col cols="6" sm="7" md="6" class="text-right">
            <v-btn v-if="canEditCompetition" outlined>
              <v-icon>$vuetify.icons.edit</v-icon>Edit Comp
            </v-btn>
            <v-btn
              v-if="canCreateInHouseEvent"
              depressed
              color="primary"
              link
              :to="{ name: 'in-house-competitionId-matches-add', params: { competitionId: inHouseCompetitionId }}"
            >
              <v-icon>$vuetify.icons.plusOutline</v-icon>Add Event
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="3">
        <h3 class="text-p1 info--text text--darken-1 mb-4">
          Lead Staff Member
        </h3>
        <FxUserItem :item="lead" :subtitle="lead.jobRole" />

        <div class="text-p1">
          <v-icon>mdi-email-outline</v-icon> <a class="info--text text--darken-2" :href="`mailto:${lead.email}`">{{ lead.email }}</a>
        </div>
        <div v-if="lead.phone" class="text-p1">
          <v-icon>mdi-phone-in-talk</v-icon> <a class="info--text text--darken-2" :href="`tel:${lead.phone}`">{{ lead.phone }}</a>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="9">
        <template v-if="showNextMatch">
          <h2 class="text-p2 font-weight-bold mb-2 info--text text--darken-3">
            Next Event
          </h2>

          <v-card>
            <nuxt-link
              class="text-decoration-none"
              :to="{ name: 'in-house-competitionId-matches-matchId', params: {
                competitionId: nextMatch.inHouseEvent.inHouseCompetitionId,
                matchId: nextMatch.id
              }}"
            >
              <FxInHouseEventItem :match="nextMatch" :me="nextMatch.homeTeam" :opponent="nextMatch.awayTeam" :context-school-id="contextSchoolId" :event-type="nextMatch.inHouseEvent.eventType" />
            </nuxt-link>
          </v-card>
        </template>

        <template v-if="showFixtures">
          <h2 class="text-p2 font-weight-bold mt-6 mb-2 info--text text--darken-3">
            Fixtures
          </h2>
          <v-card v-for="match in fixtures" :key="`fixture-${match.id}`" class="mb-2">
            <nuxt-link
              class="text-decoration-none"
              :to="{ name: 'in-house-competitionId-matches-matchId', params: {
                competitionId: match.inHouseEvent.inHouseCompetitionId,
                matchId: match.id
              }}"
            >
              <FxInHouseEventItem :match="match" :me="match.homeTeam" :opponent="match.awayTeam" :context-school-id="contextSchoolId" :event-type="match.inHouseEvent.eventType" />
            </nuxt-link>
          </v-card>
        </template>

        <template v-if="showResults">
          <h2 class="text-p2 font-weight-bold mt-6 mb-2 info--text text--darken-3">
            Results
          </h2>
          <v-card v-for="match in results" :key="`result-${match.id}`" class="mb-2">
            <nuxt-link
              class="text-decoration-none"
              :to="{ name: 'in-house-competitionId-matches-matchId', params: {
                competitionId: match.inHouseEvent.inHouseCompetitionId,
                matchId: match.id
              }}"
            >
              <FxInHouseEventItem :match="match" :me="match.homeTeam" :opponent="match.awayTeam" :context-school-id="contextSchoolId" :event-type="match.inHouseEvent.eventType" />
            </nuxt-link>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import FxInHouseEventItem from '@/components/FxInHouseEventItem/FxInHouseEventItem'

export default {
  name: 'InHouseCompetitionPage',
  components: {
    FxInHouseEventItem,
  },
  data: () => ({
    filter: null,
    inHouseCompetition: {},
    sport: {},
    season: {},
    lead: {},
    matches: [],
  }),

  async fetch () {
    this.inHouseCompetition = await this.$store.dispatch('api/inHouseCompetitions/get', {
      id: this.inHouseCompetitionId,
      schoolId: this.contextSchoolId,
    })

    const [sport, season, lead, matches] = await Promise.all([
      this.$store.dispatch('api/sports/fetch', this.inHouseCompetition.sportId),
      this.$store.getters['seasons/byId'](this.inHouseCompetition.seasonId),
      this.$store.dispatch('api/users/fetch', {
        id: this.inHouseCompetition.leadId,
        schoolId: this.contextSchoolId,
      }),
      this.$store.dispatch('api/inHouseMatches/getByCompetition', {
        schoolId: this.contextSchoolId,
        inHouseCompetitionId: this.inHouseCompetitionId,
      }),
    ])

    this.sport = sport
    this.season = season
    this.lead = lead
    this.matches = matches
  },

  head () {
    return {
      title: this.inHouseCompetition?.name,
    }
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      canCreateInHouseEvent: 'user/acl/canCreateInHouseEvent',
      canEditCompetition: 'user/acl/canCreateCompetition',
    }),
    inHouseCompetitionId () {
      return this.$route.params.competitionId
    },
    today () {
      return DateTime.now().toFormat('yyyy-MM-dd')
    },
    timeNow () {
      return DateTime.now().toFormat('HH:mm')
    },
    nextMatch () {
      return this.matches.find((match) => {
        return (match.date > this.today) || (match.date > this.today && match.startTime >= this.timeNow)
      })
    },
    fixtures () {
      return this.matches
    },
    results () {
      return this.matches
    },

    showNextMatch () {
      return this.filter === null && this.nextMatch
    },

    showFixtures () {
      return (this.filter === 'fixtures' || !this.filter) && this.fixtures.length
    },

    showResults () {
      return (this.filter === 'results' || !this.filter) && this.results.length
    },
  },
}
</script>

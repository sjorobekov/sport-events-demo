<template>
  <div>
    <v-row>
      <v-col md="9">
        <v-card v-if="team.photo">
          <v-img
            class="white--text align-end"
            height="388px"
            :src="team.photo"
          >
            <v-list-item dark>
              <v-list-item-content>
                <v-list-item-title class="text-h3">
                  {{ team.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-subheading font-weight-bold white--text">
                  {{ sport.name }} &bull; {{ season.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <FxTeamPrivacyChipBig v-if="!$fetchState.pending && isLoggedIn" :publish-team="team.publishTeam" :publish-results="team.publishResults" />
              </v-list-item-action>
            </v-list-item>
          </v-img>
        </v-card>
        <v-list-item v-else>
          <v-list-item-content>
            <v-list-item-title class="text-h3">
              {{ team.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-subheading font-weight-bold">
              {{ sport.name }} &bull; {{ season.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <FxTeamPrivacyChipBig v-if="!$fetchState.pending && isLoggedIn" :publish-team="team.publishTeam" :publish-results="team.publishResults" />
          </v-list-item-action>
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

              <v-chip class="info--text" value="training">
                Training
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col cols="6" sm="7" md="6" class="text-right">
            <v-btn v-if="canEditTeam" outlined link :to="{ name: 'teams-id-edit', params: { id: team.id } }">
              <v-icon>$vuetify.icons.edit</v-icon>Edit Team
            </v-btn>
            <v-btn
              v-if="canCreateEvent"
              depressed
              color="primary"
              link
              :to="{ name: 'events-add', query: { teamId: teamId, sportId: team.sportId, leadId: team.coachId, gender: team.gender, ability: team.ability, age: team.age }}"
            >
              <v-icon>$vuetify.icons.plusOutline</v-icon>Add Event
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="3">
        <h3 class="text-p1 info--text text--darken-1 mb-4">
          Team Overview
        </h3>

        <FxWinRateBar class="mt-3" :won="team.won" :lost="team.lost" :drawn="team.drawn" />

        <v-divider class="my-4" />

        <h3 class="text-p1 info--text text--darken-1 mb-4">
          Team Coach
        </h3>
        <FxUserItem :item="coach" :subtitle="coach.jobRole" />

        <div class="text-p1">
          <v-icon>mdi-email-outline</v-icon> <a class="info--text text--darken-2" :href="`mailto:${coach.email}`">{{ coach.email }}</a>
        </div>
        <div v-if="coach.phone" class="text-p1">
          <v-icon>mdi-phone-in-talk</v-icon> <a class="info--text text--darken-2" :href="`tel:${coach.phone}`">{{ coach.phone }}</a>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="9">
        <template v-if="showNextEvent">
          <h2 class="text-p2 font-weight-bold mb-2 info--text text--darken-3">
            Next Event
          </h2>

          <v-card>
            <nuxt-link class="text-decoration-none" :to="{ name: 'events-eventId', params: { eventId: nextEvent.id } }">
              <FxEventItem :event="nextEvent" :me="nextEvent.me" :opponent="nextEvent.opponent" :context-school-id="contextSchoolId" />
            </nuxt-link>
          </v-card>
        </template>

        <template v-if="showFixtures">
          <h2 class="text-p2 font-weight-bold mt-6 mb-2 info--text text--darken-3">
            Fixtures
          </h2>
          <v-card v-for="event in fixtures" :key="`fixture-${event.id}`" class="mb-2">
            <nuxt-link class="text-decoration-none" :to="{ name: 'events-eventId', params: { eventId: event.id } }">
              <FxEventItem :event="event" :me="event.me" :opponent="event.opponent" :context-school-id="contextSchoolId" />
            </nuxt-link>
          </v-card>
        </template>

        <template v-if="showResults">
          <h2 class="text-p2 font-weight-bold mt-6 mb-2 info--text text--darken-3">
            Results
          </h2>
          <v-card v-for="event in results" :key="`result-${event.id}`" class="mb-2">
            <nuxt-link class="text-decoration-none" :to="{ name: 'events-eventId', params: { eventId: event.id } }">
              <FxEventItem :event="event" :me="event.me" :opponent="event.opponent" :context-school-id="contextSchoolId" />
            </nuxt-link>
          </v-card>
        </template>

        <template v-if="showTraining">
          <h2 class="text-p2 font-weight-bold mt-6 mb-2 info--text text--darken-3">
            Training
          </h2>
          <v-card v-for="event in training" :key="`training-${event.id}`" class="mb-2">
            <FxEventItem :event="event" :me="event.me" :context-school-id="contextSchoolId" />
          </v-card>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import FxEventItem from '@/components/PageComponents/FxTeamsPage/FxEventItem'
import { EventType } from '@/enum'
import FxTeamPrivacyChipBig from '@/components/FxTeamPrivacyChipBig'
import FxWinRateBar from '@/components/FxWinRateBar'

export default {
  name: 'TeamPage',
  components: {
    FxEventItem,
    FxTeamPrivacyChipBig,
    FxWinRateBar,
  },
  data: () => ({
    filter: null,
    team: {},
    sport: {},
    season: {},
    coach: {},
    events: [],
  }),

  async fetch () {
    this.team = await this.$store.dispatch('api/teams/get', {
      id: this.teamId,
      schoolId: this.contextSchoolId,
    })

    const [sport, season, coach, events] = await Promise.all([
      this.$store.dispatch('api/sports/fetch', this.team.sportId),
      this.$store.getters['seasons/byId'](this.team.seasonId),
      this.$store.dispatch('api/users/fetch', {
        id: this.team.coachId,
        schoolId: this.contextSchoolId,
      }),
      this.$store.dispatch('api/events/getByTeam', {
        schoolId: this.contextSchoolId,
        teamId: this.teamId,
      }),
    ])

    this.sport = sport
    this.season = season
    this.coach = coach
    this.events = events
  },

  head () {
    return {
      title: this.team?.name,
    }
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'context/isLoggedIn',
      contextSchoolId: 'context/schoolId',
      canCreateEvent: 'user/acl/canCreateEvent',
      canEditTeam: 'user/acl/canCreateTeam',
    }),
    teamId () {
      return this.$route.params.id
    },
    today () {
      return DateTime.now().toFormat('yyyy-MM-dd')
    },
    timeNow () {
      return DateTime.now().toFormat('HH:mm')
    },
    nextEvent () {
      return this.events.find((event) => {
        return (event.date > this.today) || (event.date > this.today && event.startTime >= this.timeNow)
      })
    },
    fixtures () {
      return this.events
    },
    results () {
      return this.events
    },
    training () {
      return this.events.filter((event) => {
        return event.eventType === EventType.TRAINING
      })
    },

    showNextEvent () {
      return this.filter === null && this.nextEvent
    },

    showFixtures () {
      return (this.filter === 'fixtures' || !this.filter) && this.fixtures.length
    },

    showResults () {
      return (this.filter === 'results' || !this.filter) && this.results.length
    },

    showTraining () {
      return (this.filter === 'training' || !this.filter) && this.training.length
    },
    compact () {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
}
</script>

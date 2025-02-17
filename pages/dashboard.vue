<template>
  <div>
    <h1 v-if="me" class="text-h4 text-md-h3 mb-6 neutral--text text--darken-4 font-weight-bold">
      👋 Welcome, {{ name }}
    </h1>
    <FxDashboardPageCard :teams-today="teamsToday" />

    <v-row class="mt-5">
      <v-col cols="12" :md="teams.length > 0 ? 9 : 12">
        <div class="d-flex justify-space-between mb-3">
          <h2 class="text-h4s neutral--text text--darken-4">
            Today's Events
          </h2>
          <v-btn color="neutral darken-3" outlined @click="toggleMyEvents">
            <v-icon v-if="onlyMyEvents" color="neutral darken-1">
              $vuetify.icons.calendar-small
            </v-icon>
            <v-icon v-if="!onlyMyEvents" color="neutral darken-1">
              $vuetify.icons.user-small
            </v-icon>
            {{ onlyMyEvents ? 'Show All Events' : 'Show My Events' }}
          </v-btn>
        </div>
        <section v-if="events.length > 0">
          <v-card v-for="event in filteredEvents" :key="`event-${event.id}`" class="mb-2 card-has-hover">
            <nuxt-link class="text-decoration-none" :to="{ name: 'events-eventId', params: { eventId: event.id } }">
              <FxCalendarEvent :value="event" />
            </nuxt-link>
          </v-card>
        </section>
        <section v-else class="mt-6 mt-md-12">
          <FxNoEventsState />
        </section>
      </v-col>

      <v-col v-if="teams.length > 0" cols="12" md="3">
        <h2 class="text-h4s mb-2 neutral--text text--darken-4">
          My Teams
        </h2>
        <v-card v-for="team in teams" :key="team.id" class="mb-2 card-has-hover" :to="{ name: 'teams-id', params: { id: team.id } }">
          <v-container :style="style(team.sport)" class="rounded">
            <v-row>
              <v-col class="pt-1 pb-0">
                <v-list-item class="px-0">
                  <v-list-item-avatar tile>
                    <v-img :src="team.sport.icon" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="neutral--text text--darken-4">
                      {{ team.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="neutral--text text--darken-3">
                      {{ team.sport.name }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'
import FxCalendarEvent from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent'
import FxDashboardPageCard from '@/components/PageComponents/FxDashboardPage/FxDashboardPageCard'
import FxNoEventsState from '~/components/PageComponents/FxDashboardPage/FxNoEventsState.vue'
import { EventStatus } from '@/enum'

export default {
  name: 'DashboardPage',
  components: {
    FxCalendarEvent,
    FxDashboardPageCard,
    FxNoEventsState,
  },

  middleware: ({ store, redirect }) => {
    if (!store.getters['context/isLoggedIn']) {
      return redirect({ name: 'home' })
    }
  },

  data: () => ({
    events: [],
    teams: [],
    teamsToday: 0,
    onlyMyEvents: false,
  }),

  async fetch () {
    const params = {
      limit: 2000,
      orderDesc: 'false',
      from: DateTime.now().toFormat('yyyy-MM-dd'),
      to: DateTime.now().toFormat('yyyy-MM-dd'),
      status: EventStatus.CONFIRMED,
    }

    const [{ data: events }, { data: inHouseMatches }] = await Promise.all([
      this.$store.dispatch('api/events/getBySchool', {
        schoolId: this.contextSchoolId,
        params,
      }),
      this.$store.dispatch('api/inHouseMatches/getBySchool', {
        schoolId: this.contextSchoolId,
        params,
      }),
    ])

    const teams = events
      .flatMap(item => item.participants)
      .filter(item => item.team?.schoolId === this.contextSchoolId)
      .map(item => item.teamId)
    this.teamsToday = [...new Set(teams)].length

    this.teams = await this.getTeams()

    this.events = [...events, ...inHouseMatches].sort((a, b) => {
      return `${a.date}T${a.startTime}` > `${b.date}T${b.startTime}` ? 1 : -1
    })
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      me: 'context/me',
      currentSeason: 'seasons/current',
    }),

    name () {
      return this.me.displayName ? this.me.displayName : `${this.me.firstname} ${this.me.lastname}`
    },

    filteredEvents () {
      if (!this.onlyMyEvents) {
        return this.events
      }
      return this.events.filter((item) => {
        const isMyEvent = item.kind === 'Event' && item.me.leadId === this.me.id
        const isMyInHouseEvent = item.kind === 'InHouseEventMatch' && item.inHouseEvent.leadId === this.me.id
        return isMyEvent || isMyInHouseEvent
      })
    },
  },
  methods: {
    getTeams () {
      return this.$store.dispatch('api/teams/list', {
        schoolId: this.contextSchoolId,
        params: { seasonId: this.currentSeason.id, coachId: this.me.id },
      })
    },
    style (sport) {
      return { borderLeft: `${sport?.color} 8px solid` }
    },
    toggleMyEvents () {
      this.onlyMyEvents = !this.onlyMyEvents
    },
  },
}
</script>

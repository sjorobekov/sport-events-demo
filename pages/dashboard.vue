<template>
  <div>
    <h1 v-if="me">
      👋 Welcome, {{ name }}
    </h1>
    <FxDashboardPageCard />

    <v-row class="mt-5">
      <v-col v-if="events.length > 0" lg="9" sm="12">
        <h2>
          Today's Events
        </h2>
        <v-card v-for="event in events" :key="`event-${event.id}`" class="mb-2">
          <nuxt-link class="text-decoration-none" :to="{ name: 'events-eventId', params: { eventId: event.id } }">
            <FxCalendarEvent :value="event" />
          </nuxt-link>
        </v-card>
      </v-col>

      <v-col v-if="teams.length > 0">
        <h2>
          Teams
        </h2>
        <v-card v-for="team in teams" :key="team.id" class="mb-2" :to="{ name: 'teams-id', params: { id: team.id } }">
          <v-container :style="style(team.sport)" class="rounded">
            <v-row>
              <v-col class="border-bottom pt-1 pb-0">
                <v-list-item class="px-0">
                  <v-list-item-avatar>
                    <v-avatar>
                      <v-img :src="team.sport.icon" />
                    </v-avatar>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ team.age }} {{ team.ability }}</v-list-item-title>
                    <v-list-item-subtitle>
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
import FxCalendarEvent from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/FxCalendarEvent'
import FxDashboardPageCard from '@/components/PageComponents/FxDashboardPage/FxDashboardPageCard'

export default {
  name: 'DashboardPage',
  components: {
    FxCalendarEvent,
    FxDashboardPageCard,
  },

  middleware: ({ store, redirect }) => {
    if (!store.getters['context/isLoggedIn']) {
      return redirect({ name: 'portal' })
    }
  },

  data: () => ({
    events: [],
    teams: [],
  }),

  async fetch () {
    const { data } = await this.$store.dispatch('api/events/getBySchool', {
      schoolId: this.contextSchoolId,
      params: {
        limit: 2000,
        orderDesc: 'false',
        from: DateTime.now().toFormat('yyyy-MM-dd'),
        to: DateTime.now().plus({ month: 1 }).toFormat('yyyy-MM-dd'),
      },
    })

    this.events = data

    this.teams = await this.getTeams()
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
  },
  methods: {
    getTeams () {
      return this.$store.dispatch('api/teams/list', {
        schoolId: this.contextSchoolId,
        params: { seasonId: this.currentSeason.id },
      })
    },
    style (sport) {
      return { borderLeft: `${sport?.color} 8px solid` }
    },
  },
}
</script>

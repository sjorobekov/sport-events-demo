<template>
  <div>
    <v-row>
      <v-col md="9">
        <v-card>
          <v-img
            class="white--text align-end"
            height="388px"
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
            <v-btn v-if="canEditTeam" outlined>
              <v-icon>$vuetify.icons.edit</v-icon>Edit Comp
            </v-btn>
            <v-btn
              v-if="canCreateEvent"
              depressed
              color="primary"
              link
              :to="{ name: 'events-add', query: { teamId: teamId, sportId: inHouseCompetition.sportId, leadId: inHouseCompetition.leadId, gender: inHouseCompetition.gender, ability: inHouseCompetition.ability, age: inHouseCompetition.age }}"
            >
              <v-icon>$vuetify.icons.plusOutline</v-icon>Add Event
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="3">
        <v-divider class="my-4" />

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
import FxEventItem from '@/components/FxEventItem/FxEventItem'
import { EventType } from '@/enum'

export default {
  name: 'InHouseCompetitionPage',
  components: {
    FxEventItem,
  },
  data: () => ({
    filter: null,
    inHouseCompetition: {},
    sport: {},
    season: {},
    lead: {},
    events: [],
  }),

  async fetch () {
    this.inHouseCompetition = await this.$store.dispatch('api/inHouseCompetitions/get', {
      id: this.teamId,
      schoolId: this.contextSchoolId,
    })

    const [sport, season, lead, events] = await Promise.all([
      this.$store.dispatch('api/sports/fetch', this.inHouseCompetition.sportId),
      this.$store.getters['seasons/byId'](this.inHouseCompetition.seasonId),
      this.$store.dispatch('api/users/fetch', {
        id: this.inHouseCompetition.leadId,
        schoolId: this.contextSchoolId,
      }),
      this.$store.dispatch('api/events/getByTeam', {
        schoolId: this.contextSchoolId,
        teamId: this.teamId,
      }),
    ])

    this.sport = sport
    this.season = season
    this.lead = lead
    this.events = events
  },

  head () {
    return {
      title: this.inHouseCompetition?.name,
    }
  },

  computed: {
    ...mapGetters({
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
  },
}
</script>

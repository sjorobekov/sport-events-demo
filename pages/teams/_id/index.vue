<template>
  <div>
    <v-row class="hidden-md-and-up">
      <v-col>
        <v-chip-group
          v-model="filter"
          mandatory
          class="float-left"
          active-class="primary white--text"
        >
          <v-chip class="info--text" :value="null">
            All
          </v-chip>

          <v-chip class="info--text" value="upcoming">
            Upcoming
          </v-chip>

          <v-chip class="info--text" value="past">
            Past
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="9">
        <v-card :flat="!hasPhoto" :class="!hasPhoto ? 'no-photo' : null">
          <v-img
            class="white--text align-end"
            :height="photoHeight"
            :src="team.photo"
            :gradient="gradient"
          >
            <v-row no-gutters>
              <v-col cols="12" md="8">
                <v-list-item :dark="hasPhoto">
                  <v-list-item-content>
                    <v-list-item-title class="text-h3">
                      {{ team.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-subheading font-weight-bold">
                      {{ sport.name }} &bull; {{ season.name }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12" md="4" class="d-flex align-end justify-end">
                <FxTeamPrivacyChipBig v-if="!$fetchState.pending && isLoggedIn" :publish-team="team.publishTeam" :publish-results="team.publishResults" />
              </v-col>
            </v-row>
          </v-img>
        </v-card>

        <div class="hidden-sm-and-down">
          <div class="d-flex mt-4">
            <v-chip-group
              v-model="filter"
              mandatory
              class="float-left"
              active-class="primary white--text"
            >
              <v-chip class="info--text" :value="null">
                All
              </v-chip>

              <v-chip class="info--text" value="upcoming">
                Upcoming
              </v-chip>

              <v-chip class="info--text" value="past">
                Past
              </v-chip>
            </v-chip-group>
            <div class="pl-2">
              <v-switch v-model="training" class="mt-2" label="Show Training" inset hide-details />
            </div>

            <v-spacer />

            <div class="pt-1">
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
            </div>
          </div>
        </div>

        <v-row class="hidden-md-and-up">
          <v-col>
            <FxUserItem class="mx-auto" :item="coach" :subtitle="coach.jobRole" />

            <FxWinRateBar class="mt-3" :won="team.won" :lost="team.lost" :drawn="team.drawn" />
          </v-col>
        </v-row>

        <v-row class="mt-0">
          <v-col class="pt-0">
            <template v-if="showUpcoming">
              <h2 class="text-p2 font-weight-bold mt-6 mb-2 info--text text--darken-3">
                Upcoming
              </h2>
              <v-card v-for="event in upcoming" :key="`upcoming-${event.id}`" class="mb-2">
                <nuxt-link class="text-decoration-none" :to="{ name: 'events-eventId', params: { eventId: event.id } }">
                  <FxEventItem :event="event" :me="event.me" :opponent="event.opponent" />
                </nuxt-link>
              </v-card>
            </template>

            <template v-if="showPast">
              <h2 class="text-p2 font-weight-bold mt-6 mb-2 info--text text--darken-3">
                Past
              </h2>
              <v-card v-for="event in past" :key="`past-${event.id}`" class="mb-2">
                <nuxt-link class="text-decoration-none" :to="{ name: 'events-eventId', params: { eventId: event.id } }">
                  <FxEventItem :event="event" :me="event.me" :opponent="event.opponent" />
                </nuxt-link>
              </v-card>
            </template>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="3" class="hidden-sm-and-down">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import FxEventItem from '@/components/PageComponents/FxTeamsPage/FxEventItem'
import FxTeamPrivacyChipBig from '@/components/FxTeamPrivacyChipBig'
import FxWinRateBar from '@/components/FxWinRateBar'
import { EventType } from '@/enum'

export default {
  name: 'TeamPage',
  components: {
    FxEventItem,
    FxTeamPrivacyChipBig,
    FxWinRateBar,
  },
  data: () => ({
    filter: null,
    training: false,
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

    trainingFilter () {
      if (this.training) {
        return this.events
      }

      return this.events.filter(event => event.eventType !== EventType.TRAINING)
    },

    upcoming () {
      return this.trainingFilter.filter((event) => {
        return event.date >= this.today
      })
    },

    past () {
      return this.trainingFilter.filter(event => event.date < this.today)
    },

    showPast () {
      return (this.filter === 'past' || !this.filter) && this.past.length
    },

    showUpcoming () {
      return (this.filter === 'upcoming' || !this.filter) && this.upcoming.length
    },

    compact () {
      return this.$vuetify.breakpoint.smAndDown
    },

    photoHeight () {
      if (!this.hasPhoto) {
        return null
      }

      return this.compact ? '220px' : '388px'
    },

    hasPhoto () {
      return !!this.team.photo
    },

    gradient () {
      return this.hasPhoto ? 'to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)' : null
    },
  },
}
</script>

<style scoped>
/deep/ .no-photo {
  background: none;
}
</style>

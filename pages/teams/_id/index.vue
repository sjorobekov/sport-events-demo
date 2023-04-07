<template>
  <div>
    <v-row class="mt-2 mt-md-8">
      <v-col cols="12" sm="12" lg="9">
        <v-card :flat="!hasPhoto" :class="!hasPhoto && 'no-photo'">
          <v-img
            class="white--text align-end"
            :height="photoHeight"
            :src="team.photo"
            :gradient="gradient"
          >
            <div class="d-flex">
              <v-list-item :dark="hasPhoto" :class="{ 'pa-0': !hasPhoto }">
                <v-list-item-content>
                  <v-list-item-title class="text-h3" :class="!hasPhoto && 'neutral--text text--darken-4'">
                    {{ team.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-subheading font-weight-bold" :class="!hasPhoto && 'neutral--text text--darken-3'">
                    {{ sport.name }} &bull; {{ season.name }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <div class="d-flex align-end">
                <FxTeamPrivacyChipBig v-if="!$fetchState.pending && isLoggedIn" :publish-team="team.publishTeam" :publish-results="team.publishResults" />
              </div>
            </div>
          </v-img>
        </v-card>
        <v-row class="hidden-lg-and-up">
          <v-col>
            <FxWinRateBar v-if="showWinRate" class="mt-5" :won="team.won" :lost="team.lost" :drawn="team.drawn" />
          </v-col>
        </v-row>
        <div>
          <div class="d-flex mt-4">
            <v-chip-group
              v-model="filter"
              mandatory
              class="float-left"
              active-class="primary white--text"
            >
              <v-chip class="team-chip" :value="null">
                All
              </v-chip>

              <v-chip class="team-chip" value="upcoming">
                Upcoming
              </v-chip>

              <v-chip class="team-chip" value="past">
                Past
              </v-chip>
            </v-chip-group>
            <v-switch
              v-model="training"
              class="ml-2 mt-0 switch"
              style="width: 30px"
              inset
              hide-details
            >
              <template #label>
                <span class="input__label">Show Training</span>
              </template>
            </v-switch>

            <v-spacer />

            <div class="pt-1">
              <v-btn
                v-if="canEditTeam"
                class="hidden-sm-and-down"
                color="neutral darken-3"
                outlined
                link
                :to="{ name: 'teams-id-edit', params: { id: team.id } }"
              >
                <v-icon color="neutral darken-2">
                  $vuetify.icons.edit
                </v-icon>Edit Team
              </v-btn>
              <v-btn
                v-if="canCreateEvent"
                depressed
                class="hidden-sm-and-down"
                color="primary"
                link
                :to="{ name: 'events-add', query: { teamId: teamId, sportId: team.sportId, leadId: team.coachId, gender: team.gender, ability: team.ability, age: team.age }}"
              >
                <v-icon>
                  $vuetify.icons.plusOutline
                </v-icon>Add Event
              </v-btn>

              <v-menu v-if="canEditTeam || canCreateEvent">
                <template #activator="{ on, attrs }">
                  <v-btn class="hidden-md-and-up" icon v-bind="attrs" v-on="on">
                    <v-icon color="neutral darken-1">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item v-if="canCreateEvent" link :to="{ name: 'events-add', query: { teamId: teamId, sportId: team.sportId, leadId: team.coachId, gender: team.gender, ability: team.ability, age: team.age }}">
                    <v-list-item-title class="neutral--text text--darken-3">Create Event</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="canEditTeam" link :to="{ name: 'teams-id-edit', params: { id: team.id } }">
                    <v-list-item-title class="neutral--text text--darken-3">Edit Team</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>
        </div>

        <v-row v-if="hasEvents" class="mt-0">
          <v-col class="pt-0">
            <template v-if="showUpcoming">
              <h2 class="text-p2 font-weight-bold mt-6 mb-2 neutral--text text--darken-4">
                Upcoming
              </h2>
              <v-card v-for="event in upcoming" :key="`upcoming-${event.id}`" class="mb-2 card-has-hover">
                <nuxt-link class="text-decoration-none" :to="{ name: 'events-eventId', params: { eventId: event.id } }">
                  <FxEventItem :value="event" />
                </nuxt-link>
              </v-card>
            </template>

            <template v-if="showPast">
              <h2 class="text-p2 font-weight-bold mt-6 mb-2 neutral--text text--darken-4">
                Past
              </h2>
              <v-card v-for="event in past" :key="`past-${event.id}`" class="mb-2 card-has-hover">
                <nuxt-link class="text-decoration-none" :to="{ name: 'events-eventId', params: { eventId: event.id } }">
                  <FxEventItem :value="event" />
                </nuxt-link>
              </v-card>
            </template>
          </v-col>
        </v-row>
        <div v-else-if="!$fetchState.pending">
          <v-col class="d-flex flex-column justify-center align-center pt-12">
            <v-img width="100" :src="noEvents" class="mb-3" />
            <div class="text-p3 text-center neutral--text text--darken-3 mb-4">
              Oops! No events for now...
            </div>
          </v-col>
        </div>
      </v-col>
      <v-col lg="3" class="hidden-md-and-down">
        <h3 class="text-p1 neutral--text text--darken-2 mb-2">
          Team Overview
        </h3>

        <FxWinRateBar v-if="showWinRate" class="mt-3" :won="team.won" :lost="team.lost" :drawn="team.drawn" />

        <v-divider class="my-5" />

        <h3 class="text-p1 neutral--text text--darken-2 mb-2">
          Team Coach
        </h3>
        <FxUserItem :item="coach" :subtitle="coach.jobRole" />
        <div v-if="coach.phone" class="text-p1 mb-1">
          <v-icon size="20" color="primary lighten-1">
            $vuetify.icons.phone-fill
          </v-icon> <a class="link" :href="`tel:${coach.phone}`">{{ coach.phone }}</a>
        </div>
        <div class="text-p1">
          <v-icon size="20" color="primary lighten-1">
            $vuetify.icons.mail-fill
          </v-icon> <a class="link email" :href="`mailto:${coach.email}`">{{ coach.email }}</a>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import noEvents from './noEvents.svg'
import FxEventItem from '@/components/PageComponents/FxTeamsPage/FxTeamEvent'
import FxTeamPrivacyChipBig from '@/components/FxTeamPrivacyChipBig'
import FxWinRateBar from '@/components/FxWinRateBar'
import { EventType, PublishResult } from '@/enum'

export default {
  name: 'TeamPage',
  components: {
    FxEventItem,
    FxTeamPrivacyChipBig,
    FxWinRateBar,
  },
  data: () => ({
    filter: null,
    training: true,
    team: {},
    sport: {},
    season: {},
    coach: {},
    events: [],
    noEvents,
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

    hasEvents () {
      return this.upcoming.length > 0 || this.past.length > 0
    },

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
      return this.trainingFilter
        .filter(event => event.date >= this.today)
        .reverse()
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

    showWinRate () {
      return this.team.publishResults !== PublishResult.EVENTS
    },
  },
}
</script>

<style scoped>
::v-deep .no-photo {
  background: none;
}
.email {
  color: var(--v-primary-lighten1)!important;
}
.theme--light.v-divider {
  border-color: #CCCCCC;
  box-shadow: 0 1px 0 #ffffff;
}
.theme--light.v-chip:not(.v-chip--active) {
  background: var(--v-neutral-lighten1);
}
.team-chip {
  color: var(--v-neutral-darken3);
}
.input__label {
   color: var(--v-neutral-darken3);
   font-size: 14px;
}
</style>

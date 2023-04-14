<template>
  <div>
    <v-row>
      <v-col cols="12" lg="9">
        <v-card :flat="!hasPhoto" :class="!hasPhoto ? 'no-photo' : null">
          <v-img
            class="white--text align-end"
            :height="photoHeight"
            :gradient="gradient"
            :src="inHouseCompetition.photo"
          >
            <v-list-item :dark="hasPhoto" :class="{ 'pa-0': !hasPhoto }">
              <v-list-item-content>
                <v-list-item-title class="text-h3">
                  {{ inHouseCompetition.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-subheading font-weight-bold">
                  In-House Sport &bull; {{ sport.name }} &bull; {{ season.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-img>
        </v-card>
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

          <v-spacer />

          <div class="pt-1">
            <v-btn v-if="canEditCompetition" class="hidden-sm-and-down neutral--text text--darken-3" outlined link :to="{ name: 'in-house-competitionId-matches-edit', params: { competitionId: inHouseCompetitionId }}">
              <v-icon color="neutral darken-2">
                $vuetify.icons.edit
              </v-icon>Edit Comp
            </v-btn>
            <v-btn
              v-if="canCreateInHouseEvent"
              class="hidden-sm-and-down"
              depressed
              color="primary"
              link
              :to="{ name: 'in-house-competitionId-matches-add', params: { competitionId: inHouseCompetitionId }}"
            >
              <v-icon>$vuetify.icons.add-all</v-icon>Add Event
            </v-btn>

            <v-menu>
              <template #activator="{ on, attrs }">
                <v-btn class="hidden-md-and-up" icon v-bind="attrs" v-on="on">
                  <v-icon color="neutral darken-1">
                    mdi-dots-vertical
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-if="canEditCompetition" link :to="{ name: 'in-house-competitionId-matches-edit', params: { competitionId: inHouseCompetitionId }}">
                  <v-list-item-title class="neutral--text text--darken-3">
                    Edit Competition
                  </v-list-item-title>
                </v-list-item>
                <v-list-item v-if="canCreateInHouseEvent" link :to="{ name: 'in-house-competitionId-matches-add', params: { competitionId: inHouseCompetitionId }}">
                  <v-list-item-title class="neutral--text text--darken-3">
                    Add Event
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </v-col>
      <v-col lg="3" class="hidden-md-and-down">
        <h3 class="text-p1 neutral--text text--darken-2 mb-2">
          Lead Staff Member
        </h3>
        <FxUserItem :item="lead" :subtitle="lead.jobRole" />

        <div class="text-p1 mb-1">
          <v-icon size="20" color="primary lighten-1">
            $vuetify.icons.phone-fill
          </v-icon> <a class="link" :href="`tel:${lead.phone}`">{{ lead.phone }}</a>
        </div>
        <div v-if="lead.phone" class="text-p1">
          <v-icon size="20" color="primary lighten-1">
            $vuetify.icons.mail-fill
          </v-icon> <a class="link email" :href="`mailto:${lead.email}`">{{ lead.email }}</a>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="hasEvents">
      <v-col lg="9">
        <template v-if="showUpcoming">
          <h2 class="text-p2 font-weight-bold mt-6 mb-2 neutral--text text--darken-4">
            Upcoming
          </h2>
          <v-card v-for="match in upcoming" :key="`upcoming-${match.id}`" class="mb-2 card-has-hover">
            <nuxt-link
              class="text-decoration-none"
              :to="{ name: 'in-house-competitionId-matches-matchId', params: {
                competitionId: match.inHouseEvent.inHouseCompetitionId,
                matchId: match.id
              }}"
            >
              <FxInHouseEventItem
                :match="match"
                :me="match.homeTeam"
                :opponent="match.awayTeam"
                :context-school-id="contextSchoolId"
                :event-type="match.inHouseEvent.eventType"
                hide-sport-color
              />
            </nuxt-link>
          </v-card>
        </template>

        <template v-if="showPast">
          <h2 class="text-p2 font-weight-bold mt-6 mb-2 neutral--text text--darken-4">
            Past
          </h2>
          <v-card v-for="match in past" :key="`past-${match.id}`" class="mb-2 card-has-hover">
            <nuxt-link
              class="text-decoration-none"
              :to="{ name: 'in-house-competitionId-matches-matchId', params: {
                competitionId: match.inHouseEvent.inHouseCompetitionId,
                matchId: match.id
              }}"
            >
              <FxInHouseEventItem
                :match="match"
                :me="match.homeTeam"
                :opponent="match.awayTeam"
                :context-school-id="contextSchoolId"
                :event-type="match.inHouseEvent.eventType"
                hide-sport-color
              />
            </nuxt-link>
          </v-card>
        </template>
      </v-col>
    </v-row>
    <v-row v-else-if="!$fetchState.pending">
      <v-col class="d-flex flex-column align-center">
        <v-img width="150" :src="noEvents" class="mb-3" />
        <div class="text-p3 neutral--text text--darken-3 mb-4">
          Oops! No in-house events for now...
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import noEvents from './noEvents.svg'
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
    noEvents,
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

    upcoming () {
      return this.matches.filter(match => match.date >= this.today)
    },

    past () {
      return this.matches.filter(match => match.date < this.today)
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
      return !!this.inHouseCompetition.photo
    },

    gradient () {
      return this.hasPhoto ? 'to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)' : null
    },

    hasEvents () {
      return this.upcoming.length || this.past.length
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
</style>

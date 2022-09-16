<template>
  <div>
    <v-app-bar
      elevation="0"
      height="10"
      color="#F1F5F9"
      app
      fixed
      style="margin-top: 50px; z-index: 4"
    />
    <v-app-bar
      elevation="0"
      height="172"
      style="margin-top: 58px; z-index: 8; border-bottom: solid 8px var(--v-primary-base)"
      app
      fixed
      color="#F1F5F9"
    >
      <v-container class="my-0 py-0">
        <div class="d-flex">
          <FxDateRangePicker v-model="dateRange" style="width: 232px" class="mr-2" />

          <FxCalendarSportFilter v-model="filter.sports" class="mr-2" :items="sportIds" />

          <v-btn height="40" outlined color="info lighten-1" @click="showFilters = !showFilters">
            <v-icon>$vuetify.icons.settings</v-icon>
            More Filters
          </v-btn>

          <v-spacer />

          <v-btn
            v-if="canCreateEvent"
            height="40"
            color="primary"
            depressed
            link
            :to="{ name: 'events-add' }"
          >
            <v-icon class="mr-1">
              $vuetify.icons.calendarAdd
            </v-icon>Create Event
          </v-btn>
        </div>

        <FxCalendar
          v-model="date"
          :from="dateRange.startDate"
          :to="dateRange.endDate"
          :dots="dots"
          @input="scrollTo"
        />
      </v-container>
    </v-app-bar>

    <v-expand-transition>
      <div v-if="showFilters">
        <FxPill class="mb-4">
          Filters
        </FxPill>

        <v-row>
          <v-col>
            <FxCalendarStaffFilter v-model="filter.leadIds" :items="leadIds" />
          </v-col>
          <v-col>
            <FxCalendarEventFilter v-model="filter.eventTypes" :items="eventTypes" />
          </v-col>
          <v-col>
            <FxCalendarOpponentFilter v-model="filter.opponentIds" :items="opponentIds" />
          </v-col>
          <v-col>
            <FxCalendarAgeFilter v-model="filter.ageGroups" :items="ageGroups" />
          </v-col>
          <v-col>
            <FxCalendarLocationFilter v-model="filter.locations" />
          </v-col>
        </v-row>
      </div>
    </v-expand-transition>

    <div
      v-for="(value, key) in events"
      :id="`date-${key}`"
      :key="key"
      v-intersect="{
        handler: onIntersect(key),
        options: {
          threshold: [1.0]
        }
      }"
    >
      <FxCalendarPill :value="key" class="my-4" />

      <v-card v-for="event in value" :key="`event-${event.id}`" class="mb-2">
        <nuxt-link class="text-decoration-none" :to="{ name: 'events-eventId', params: { eventId: event.id } }">
          <FxCalendarEventItem :event="event" :me="event.me" :opponent="event.opponent" :context-school-id="contextSchoolId" />
        </nuxt-link>
      </v-card>
    </div>
  </div>
</template>

<script>
import groupBy from 'lodash/groupBy'
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'
import uniq from 'lodash/uniq'
import FxCalendar from '@/components/FxCalendar/FxCalendar'
import FxDateRangePicker from '@/components/FxDateRangePicker'
import FxCalendarPill from '@/components/PageComponents/FxCalendarPage/FxCalendarPill'
import FxPill from '@/components/FxPill/FxPill'
import FxCalendarStaffFilter from '@/components/PageComponents/FxCalendarPage/FxCalendarStaffFilter'
import FxCalendarEventFilter from '@/components/PageComponents/FxCalendarPage/FxCalendarEventFilter'
import FxCalendarSportFilter from '@/components/PageComponents/FxCalendarPage/FxCalendarSportFilter'
import FxCalendarOpponentFilter from '@/components/PageComponents/FxCalendarPage/FxCalendarOpponentFilter'
import FxCalendarAgeFilter from '@/components/PageComponents/FxCalendarPage/FxCalendarAgeFilter'
import FxCalendarLocationFilter from '@/components/PageComponents/FxCalendarPage/FxCalendarLocationFilter'
import { EventLocationType } from '@/enum'
import FxCalendarEventItem from '@/components/PageComponents/FxCalendarPage/FxCalendarEventItem/FxCalendarEventItem'

export default {
  name: 'CalendarPage',
  components: {
    FxCalendarEventItem,
    FxCalendarLocationFilter,
    FxCalendarAgeFilter,
    FxCalendarOpponentFilter,
    FxCalendarSportFilter,
    FxCalendarEventFilter,
    FxCalendarStaffFilter,
    FxPill,
    FxCalendarPill,
    FxCalendar,
    FxDateRangePicker,
  },

  data: () => ({
    dateRange: { startDate: new Date(), endDate: new Date() },
    date: null,
    items: [],
    sports: [],
    filter: {
      sports: [],
      leadIds: [],
      eventTypes: [],
      opponentIds: [],
      ageGroups: [],
      locations: [],
    },
    showFilters: false,
  }),

  async fetch () {
    const { data } = await this.$store.dispatch('api/events/getBySchool', {
      schoolId: this.contextSchoolId,
      params: {
        limit: 2000,
        orderDesc: 'false',
        from: DateTime.fromJSDate(this.dateRange.startDate).toFormat('yyyy-MM-dd'),
        to: DateTime.fromJSDate(this.dateRange.endDate).toFormat('yyyy-MM-dd'),
      },
    })

    this.items = data
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      canCreateEvent: 'user/acl/canCreateEvent',
    }),

    dots () {
      return Object.keys(this.events)
    },

    filtered () {
      return this.items.filter((item) => {
        if (this.filter.sports.length > 0) {
          if (!this.filter.sports.includes(item.sportId)) {
            return false
          }
        }

        if (this.filter.leadIds.length > 0) {
          if (!this.filter.leadIds.includes(item.me.leadId)) {
            return false
          }
        }

        if (this.filter.eventTypes.length > 0) {
          if (!this.filter.eventTypes.includes(item.eventType)) {
            return false
          }
        }

        if (this.filter.opponentIds.length > 0) {
          if (!this.filter.opponentIds.includes(item.opponent?.listedAsOpponentId)) {
            return false
          }
        }

        if (this.filter.ageGroups.length > 0) {
          if (!this.filter.ageGroups.includes(item.age)) {
            return false
          }
        }

        if (this.filter.locations.length > 0) {
          if (
            (this.filter.locations.includes(EventLocationType.OPPONENT_CONFIRMS) &&
            item.location !== EventLocationType.OPPONENT_CONFIRMS) ||
            !this.filter.locations.includes(item.me.eventLocation)
          ) {
            return false
          }
        }

        return true
      })
    },

    events () {
      return groupBy(this.filtered, 'date')
    },

    leadIds () {
      return uniq(this.items.map(item => item.me.leadId))
    },

    eventTypes () {
      return uniq(this.items.map(item => item.eventType))
    },

    sportIds () {
      return uniq(this.items.map(item => item.sportId))
    },

    opponentIds () {
      return uniq(this.items.map(item => item.opponent?.listedAsOpponentId))
    },

    ageGroups () {
      return uniq(this.items.map(item => item.age)).filter(item => !!item).sort((a, b) => {
        return parseInt(a.substr(1, 2)) > parseInt(b.substr(1, 2)) ? 1 : -1
      })
    },
  },

  watch: {
    dateRange: {
      deep: true,
      handler () {
        this.$fetch()
      },
    },
  },

  methods: {
    onIntersect (date) {
      return (_entries, _observer, isIntersecting) => {
        if (isIntersecting) {
          this.date = DateTime.fromFormat(date, 'yyyy-MM-dd')
        }
      }
    },
    scrollTo (val) {
      if (!process.client) {
        return
      }
      try {
        const date = val.toFormat('yyyy-MM-dd')
        this.$vuetify.goTo(`#date-${date}`)
      } catch (e) {

      }
    },
  },
}
</script>

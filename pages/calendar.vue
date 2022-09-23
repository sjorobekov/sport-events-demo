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
          <FxDateRangePicker v-model="filter" style="width: 232px" class="mr-2" />

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
          :from="filter.startDate"
          :to="filter.endDate"
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
      v-for="(value, key) in eventsGroupedByDate"
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
        <FxCalendarEvent :value="event" />
      </v-card>
    </div>
  </div>
</template>

<script>
import groupBy from 'lodash/groupBy'
import isString from 'lodash/isString'
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
import FxCalendarEvent from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/FxCalendarEvent'

const DATE_FORMAT = 'yyyy-MM-dd'

const FORMAT_ADAPTER = {
  Event (item) {
    return {
      sportId: item.sportId,
      leadId: item.me?.leadId,
      eventType: item.eventType,
      opponentId: item.opponent?.listedAsOpponentId,
      age: item.age,
      location: item.me?.eventLocation,
    }
  },
  InHouseEventMatch (item) {
    return {
      sportId: item.inHouseEvent.inHouseCompetition.sportId,
      leadId: item.inHouseEvent.leadId,
      eventType: item.inHouseEvent.eventType,
      sportLocationId: item.sportLocationId,
      location: item.location,
    }
  },
}

const adapt = (item) => {
  return FORMAT_ADAPTER[item.kind](item)
}

const filter = (item, filter) => {
  const data = adapt(item)
  if (filter.sports?.length > 0) {
    if (!filter.sports.includes(data.sportId)) {
      return false
    }
  }

  if (filter.leadIds?.length > 0) {
    if (!filter.leadIds.includes(data.leadId)) {
      return false
    }
  }

  if (filter.eventTypes?.length > 0) {
    if (!filter.eventTypes.includes(data.eventType)) {
      return false
    }
  }

  if (filter.opponentIds?.length > 0) {
    if (!filter.opponentIds.includes(data.opponentId)) {
      return false
    }
  }

  if (filter.ageGroups?.length > 0) {
    if (!filter.ageGroups.includes(data.age)) {
      return false
    }
  }

  if (filter.locations?.length > 0) {
    if (
      (filter.locations.includes(EventLocationType.OPPONENT_CONFIRMS) &&
        data.location !== EventLocationType.OPPONENT_CONFIRMS) ||
      !filter.locations.includes(data.location)
    ) {
      return false
    }
  }

  return true
}

export default {
  name: 'CalendarPage',
  components: {
    FxCalendarEvent,
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
    date: null,
    items: [],
    sports: [],
    filter: {
      startDate: new Date(),
      endDate: new Date(),
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
    const params = {
      limit: 2000,
      orderDesc: 'false',
      from: DateTime.fromJSDate(this.filter.startDate).toFormat(DATE_FORMAT),
      to: DateTime.fromJSDate(this.filter.endDate).toFormat(DATE_FORMAT),
    }

    const [{ data: events }, { data: inHouseMatches }] = await Promise.all([
      this.$store.dispatch('api/events/getBySchool', {
        schoolId: this.contextSchoolId,
        params,
      }),
      await this.$store.dispatch('api/inHouseMatches/getBySchool', {
        schoolId: this.contextSchoolId,
        params,
      }),
    ])

    this.items = [...events, ...inHouseMatches]
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      canCreateEvent: 'user/acl/canCreateEvent',
    }),

    dots () {
      return Object.keys(this.eventsGroupedByDate)
    },

    filtered () {
      return this.items.filter(item => filter(item, this.filter))
    },

    eventsGroupedByDate () {
      return groupBy(this.filtered, 'date')
    },

    leadIds () {
      return uniq(this.items.map(item => adapt(item).leadId).filter(item => !!item))
    },

    eventTypes () {
      return uniq(this.items.map(item => item.eventType))
    },

    sportIds () {
      return uniq(this.items.map(item => adapt(item).sportId))
    },

    opponentIds () {
      return uniq(this.items.map(item => adapt(item).opponentId))
    },

    ageGroups () {
      return uniq(this.items.map(item => item.age)).filter(item => !!item).sort((a, b) => {
        return parseInt(a.substr(1, 2)) > parseInt(b.substr(1, 2)) ? 1 : -1
      })
    },
  },

  watch: {
    filter: {
      deep: true,
      async handler (val, old) {
        if (val.startDate !== old.startDate || val.endDate !== old.endDate) {
          await this.$fetch()
        }

        await this.$router.push({
          query: {
            ...this.filter,
            startDate: DateTime.fromJSDate(this.filter.startDate).toFormat(DATE_FORMAT),
            endDate: DateTime.fromJSDate(this.filter.endDate).toFormat(DATE_FORMAT),
          },
        })
      },
    },
  },

  created () {
    this.filter = {
      ...this.filter,
      sports: this.applyQuery(this.$route.query.sports),
      leadIds: this.applyQuery(this.$route.query.leadIds),
      eventTypes: this.applyQuery(this.$route.query.eventTypes),
      opponentIds: this.applyQuery(this.$route.query.opponentIds),
      ageGroups: this.applyQuery(this.$route.query.ageGroups),
      locations: this.applyQuery(this.$route.query.locations),
      startDate: DateTime.fromFormat(this.$route.query.startDate || DateTime.now().toFormat(DATE_FORMAT), DATE_FORMAT).toJSDate(),
      endDate: DateTime.fromFormat(this.$route.query.endDate || DateTime.now().toFormat(DATE_FORMAT), DATE_FORMAT).toJSDate(),
    }

    this.showFilters = this.filter.leadIds.length || this.filter.eventTypes.length || this.filter.opponentIds.length || this.filter.ageGroups.length || this.filter.locations.length
  },

  methods: {
    onIntersect (date) {
      return (_entries, _observer, isIntersecting) => {
        if (isIntersecting) {
          this.date = DateTime.fromFormat(date, DATE_FORMAT)
        }
      }
    },
    scrollTo (val) {
      if (!process.client) {
        return
      }
      try {
        const date = val.toFormat(DATE_FORMAT)
        this.$vuetify.goTo(`#date-${date}`)
      } catch (e) {

      }
    },

    applyQuery (val) {
      if (isString(val)) {
        return [val]
      }

      return Array.isArray(val) ? val : []
    },
  },
}
</script>

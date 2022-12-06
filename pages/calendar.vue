<template>
  <div>
    <v-app-bar
      elevation="0"
      height="172"
      fixed
      color="#F1F5F9"
      class="calendar-bar px-0"
    >
      <v-container class="my-0 py-0 px-0">
        <div class="d-flex">
          <FxDateRangePicker v-model="filter" :mobile="isMobile" class="ml-2" />

          <FxCalendarSportFilter v-model="filter.sports" style="max-width: 200px" :items="sports" class="hidden-md-and-down ml-2 mr-2" />

          <v-badge
            class="hidden-md-and-down mr-2"
            bordered
            color="primary"
            :content="desktopFilterBadges"
            :value="desktopFilterBadges"
            overlap
          >
            <v-btn height="40" outlined color="info lighten-1" style="background-color: white" @click="showFilters = !showFilters">
              <v-icon>$vuetify.icons.settings</v-icon>
              More Filters
            </v-btn>
          </v-badge>

          <v-spacer />

          <v-badge
            class="hidden-lg-and-up mr-2"
            bordered
            color="primary"
            :content="mobileFilterBadges"
            :value="mobileFilterBadges"
            overlap
          >
            <v-btn height="40" width="40" icon color="info lighten-1" @click="showFilters = !showFilters">
              <v-icon>$vuetify.icons.settings</v-icon>
            </v-btn>
          </v-badge>

          <v-btn
            v-if="canCreateEvent"
            height="40"
            color="primary"
            depressed
            link
            :to="{ name: 'events-add' }"
          >
            <v-icon class="mr-0 mr-md-2">
              $vuetify.icons.calendarAdd
            </v-icon><span class="hidden-xs-only">Create Event</span>
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
    <div class="calendar-content">
      <client-only>
        <v-expand-transition>
          <div v-if="showFilters">
            <FxPill class="mb-4">
              Filters
            </FxPill>

            <v-row class="hidden-lg-and-up">
              <v-col class=" mb-2">
                <FxCalendarSportFilter v-model="filter.sports" :items="sports" />
              </v-col>
            </v-row>

            <div class="d-flex" style="flex-wrap: wrap;gap: 8px;">
              <FxCalendarStaffFilter v-model="filter.leadIds" :items="leadIds" />
              <FxCalendarEventFilter v-model="filter.eventTypes" :items="eventTypes" :in-house-filter="containsInHouseEvents" />
              <FxCalendarOpponentFilter v-model="filter.opponentIds" :items="opponentIds" />
              <FxCalendarAgeFilter v-model="filter.ageGroups" :items="ageGroups" />
              <FxCalendarLocationFilter v-model="filter.locations" />
              <FxCalendarStatusFilter v-if="isLoggedIn" v-model="filter.privacy" />
            </div>
          </div>
        </v-expand-transition>
      </client-only>
      <client-only>
        <div
          v-for="key in eventSortedDates"
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

          <v-card v-for="event in eventsGroupedByDate[key]" :key="`event-${event.id}`" class="mb-2">
            <FxCalendarEvent :value="event" />
          </v-card>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import groupBy from 'lodash/groupBy'
import isString from 'lodash/isString'
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'
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
import { EventLocationType, EventStatus } from '@/enum'
import FxCalendarEvent from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent'
import FxCalendarStatusFilter from '@/components/PageComponents/FxCalendarPage/FxCalendarStatusFilter'

const DATE_FORMAT = 'yyyy-MM-dd'

const FORMAT_ADAPTER = {
  Event (item) {
    return {
      sportId: item.sportId,
      sport: item.sport,
      leadId: item.me?.leadId,
      eventType: item.eventType,
      opponentId: item.opponent?.listedAsOpponentId,
      age: item.age,
      location: item.me?.eventLocation,
      publish: item.me.team?.publishTeam,
    }
  },
  InHouseEventMatch (item) {
    return {
      sportId: item.inHouseEvent.inHouseCompetition.sportId,
      sport: item.inHouseEvent.inHouseCompetition.sport,
      leadId: item.inHouseEvent.leadId,
      eventType: item.kind,
      sportLocationId: item.sportLocationId,
      location: item.location,
      publish: item.inHouseEvent.inHouseCompetition.publishCompetition,
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

  if (filter.privacy?.length > 0) {
    if (data.publish && filter.privacy.includes('PUBLISHED')) {
      return true
    } else if (!data.publish && filter.privacy.includes('UNPUBLISHED')) {
      return true
    }

    return false
  }

  return true
}

export default {
  name: 'CalendarPage',
  components: {
    FxCalendarStatusFilter,
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
    filter: {
      startDate: new Date(),
      endDate: new Date(),
      sports: [],
      leadIds: [],
      eventTypes: [],
      opponentIds: [],
      ageGroups: [],
      locations: [],
      privacy: [],
    },
    showFilters: false,
  }),

  async fetch () {
    const params = {
      limit: 2000,
      orderDesc: 'false',
      from: DateTime.fromJSDate(this.filter.startDate).toFormat(DATE_FORMAT),
      to: DateTime.fromJSDate(this.filter.endDate).toFormat(DATE_FORMAT),
      status: EventStatus.CONFIRMED,
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

    this.items = [...events, ...inHouseMatches].sort((a, b) => {
      return `${a.date}T${a.startTime}` > `${b.date}T${b.startTime}` ? 1 : -1
    })
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      canCreateEvent: 'user/acl/canCreateEvent',
      isLoggedIn: 'context/isLoggedIn',
    }),

    isMobile () {
      return this.$vuetify.breakpoint.smAndDown
    },

    dots () {
      return Object.keys(this.eventsGroupedByDate)
    },

    filtered () {
      return this.items.filter(item => filter(item, this.filter))
    },

    eventsGroupedByDate () {
      return groupBy(this.filtered, 'date')
    },

    eventSortedDates () {
      return Object.keys(this.eventsGroupedByDate).sort((a, b) => a > b ? 1 : -1)
    },

    leadIds () {
      return uniq(this.items.map(item => adapt(item).leadId).filter(item => !!item))
    },

    eventTypes () {
      return uniq(this.items.map(item => item.eventType))
    },

    sports () {
      return uniqBy(this.items.map(item => adapt(item).sport), a => a.id)
    },

    opponentIds () {
      return uniq(this.items.map(item => adapt(item).opponentId))
    },

    ageGroups () {
      return uniq(this.items.map(item => item.age)).filter(item => !!item).sort((a, b) => {
        return parseInt(a.substr(1, 2)) > parseInt(b.substr(1, 2)) ? 1 : -1
      })
    },

    mobileFilterBadges () {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { startDate, endDate, ...filters } = this.filter
      return Object.values(filters).filter(item => item.length).length
    },

    desktopFilterBadges () {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { startDate, endDate, sports, ...filters } = this.filter
      return Object.values(filters).filter(item => item.length).length
    },

    containsInHouseEvents () {
      return this.items.some(item => item.kind === 'InHouseEventMatch')
    },
  },

  watch: {
    filter: {
      deep: true,
      async handler (val, old) {
        if (!(val.startDate && val.endDate)) {
          return
        }

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
      endDate: DateTime.fromFormat(this.$route.query.endDate || DateTime.now().plus({ month: 1 }).toFormat(DATE_FORMAT), DATE_FORMAT).toJSDate(),
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
        this.$vuetify.goTo(`#date-${date}`, { offset: 190 })
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

<style scoped lang="scss">
.calendar-bar {
  padding-top: 3px;
  top: 92px;
  z-index: 3;
  border-bottom: solid 8px var(--v-primary-base)!important;
  margin-left: 0;
}
.calendar-content {
  margin-top: 180px;
}
@media only screen and (min-width: 960px) {
  .calendar-bar {
    top: 55px;
    margin-left: 240px;
  }
  .calendar-content {
    margin-top: 180px;
  }
}
</style>

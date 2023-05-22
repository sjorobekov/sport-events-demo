<template>
  <div>
    <FxTopBar>
      <div class="calendar-bar pt-2" :class="{ 'height-auto': showFilters }">
        <v-container>
          <div class="d-flex px-md-2">
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
              <v-btn
                height="40"
                outlined
                color="neutral darken-3"
                :ripple="false"
                style="background-color: white"
                @click="showFilters = !showFilters"
              >
                <v-icon color="neutral darken-1">
                  $vuetify.icons.settings
                </v-icon>
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
              <v-btn height="40" width="40" icon color="neutral darken-1" @click="showFilters = !showFilters">
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
          <div class="mx-n4 mx-md-0 mt-1">
            <FxCalendar
              v-model="date"
              :from="filter.startDate"
              :to="filter.endDate"
              :dots="dots"
              @input="scrollTo"
            />
          </div>
          <client-only>
            <FxCalendarFilterDialog
              v-model="showFilters"
              :mobile="isMobile"
              @click:clearAll="$refs.filter.clearAll()"
            >
              <FxPill v-if="!isMobile" class="mb-4">
                Filters
              </FxPill>

              <FxCalendarFilter
                ref="filter"
                v-model="filter"
                :age-groups="ageGroups"
                :event-types="eventTypes"
                :opponent-ids="opponentIds"
                :lead-ids="leadIds"
                :contains-in-house-events="containsInHouseEvents"
                :sports="sports"
                class="mb-6"
              />
            </FxCalendarFilterDialog>
          </client-only>
        </v-container>
      </div>
    </FxTopBar>
    <div class="calendar-content">
      <client-only v-if="hasEvents">
        <div v-for="key in eventSortedDates" :id="`date-${key}`" :key="key" v-intersect="{ handler: onIntersect(key), options: { threshold: [1.0] } }" class="pb-6">
          <FxCalendarPill :value="key" class="my-4" />

          <v-card v-for="event in eventsGroupedByDate[key]" :key="`event-${event.id}`" class="mb-2 card-has-hover">
            <FxCalendarEvent :value="event" />
          </v-card>
        </div>
      </client-only>
      <template v-else-if="!$fetchState.pending">
        <v-col class="d-flex flex-column justify-center align-center pt-0 pt-md-8">
          <v-img width="100" :src="noEvents" class="mb-3" />
          <div class="text-p3 text-center neutral--text text--darken-3 mb-4">
            No Events For Now
          </div>
        </v-col>
      </template>
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
import noEvents from '@/pages/teams/_id/noEvents.svg'
import FxCalendar from '@/components/FxCalendar/FxCalendar'
import FxDateRangePicker from '@/components/FxDateRangePicker'
import FxCalendarPill from '@/components/PageComponents/FxCalendarPage/FxCalendarPill'
import FxPill from '@/components/FxPill/FxPill'
import FxCalendarSportFilter from '@/components/PageComponents/FxCalendarPage/FxCalendarSportFilter'
import { EventLocationType, EventStatus } from '@/enum'
import FxCalendarEvent from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent'
import FxCalendarFilterDialog from '~/components/PageComponents/FxCalendarPage/FxCalendarFilterDialog.vue'
import FxCalendarFilter from '~/components/PageComponents/FxCalendarPage/FxCalendarFilter.vue'

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
    FxCalendarFilter,
    FxCalendarFilterDialog,
    FxCalendarEvent,
    FxCalendarSportFilter,
    FxPill,
    FxCalendarPill,
    FxCalendar,
    FxDateRangePicker,
  },

  data: () => ({
    date: null,
    noEvents,
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
      this.$store.dispatch('api/inHouseMatches/getBySchool', {
        schoolId: this.contextSchoolId,
        params,
      }),
    ])

    this.items = [...events, ...inHouseMatches].sort((a, b) => {
      return `${a.date}T${a.startTime}` > `${b.date}T${b.startTime}` ? 1 : -1
    })

    const date = this.dots.find(item => item >= DateTime.now().toFormat(DATE_FORMAT)) || this.dots[this.dots.length - 1]
    this.$nextTick(() => this.scrollTo(date))
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      canCreateEvent: 'user/acl/canCreateEvent',
      isLoggedIn: 'context/isLoggedIn',
      currentSeason: 'seasons/current',
    }),

    hasEvents () {
      return this.filtered.length > 0
    },

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
      startDate: DateTime.fromFormat(this.$route.query.startDate || this.currentSeason.start, DATE_FORMAT).toJSDate(),
      endDate: DateTime.fromFormat(this.$route.query.endDate || this.currentSeason.end, DATE_FORMAT).toJSDate(),
    }

    this.showFilters = this.filter.leadIds.length || this.filter.eventTypes.length || this.filter.opponentIds.length || this.filter.ageGroups.length || this.filter.locations.length
  },

  methods: {
    onIntersect (date) {
      return (_entries, _observer, isIntersecting) => {
        if (isIntersecting) {
          this.date = date
        }
      }
    },

    scrollTo (val) {
      if (!process.client) {
        return
      }
      try {
        this.$vuetify.goTo(`#date-${val}`, { offset: 190 })
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

<style scoped lang="sass">
$calendar-bar-height: 188px

.calendar-bar
  border-bottom: solid 8px var(--v-primary-base)!important
  height: $calendar-bar-height
  background: var(--v-background-base)
  &.height-auto
    height: auto

.calendar-content
  margin-top: $calendar-bar-height + 32px
</style>

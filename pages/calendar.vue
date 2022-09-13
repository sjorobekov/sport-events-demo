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

          <v-select
            v-model="filter.sport"
            class="mr-2"
            hide-details
            style="width: 168px"
            placeholder="Filter by Sport"
            dense
            outlined
            :items="sports"
            item-text="name"
            item-value="id"
            prepend-inner-icon="$vuetify.icons.whistle"
            clearable
          />

          <v-select
            style="width: 135px"
            hide-details
            dense
            outlined
            prepend-inner-icon="$vuetify.icons.settings"
            readonly
            placeholder="More Filters"
          />
          <v-spacer />

          <v-btn color="primary" depressed link :to="{ name: 'events-add' }">
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

    <FxPill>Filters</FxPill>

    <v-row>
      <v-col>
        <FxCalendarStaffFilter v-model="filter.leadIds" :items="leadIds" />
      </v-col>
      <v-col>
        <FxCalendarEventFilter v-model="filter.eventTypes" :items="eventTypes" />
      </v-col>
    </v-row>

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
          <FxEventItem :event="event" :me="event.me" :opponent="event.opponent" :context-school-id="contextSchoolId" />
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
import FxEventItem from '@/components/FxEventItem/FxEventItem'
import FxCalendarPill from '@/components/PageComponents/FxCalendarPage/FxCalendarPill'
import FxPill from '@/components/FxPill/FxPill'
import FxCalendarStaffFilter from '@/components/PageComponents/FxCalendarPage/FxCalendarStaffFilter'
import FxCalendarEventFilter from '@/components/PageComponents/FxCalendarPage/FxCalendarEventFilter'

export default {
  name: 'CalendarPage',
  components: {
    FxCalendarEventFilter,
    FxCalendarStaffFilter,
    FxPill,
    FxCalendarPill,
    FxEventItem,
    FxCalendar,
    FxDateRangePicker,
  },

  data: () => ({
    dateRange: { startDate: new Date(), endDate: new Date() },
    date: null,
    items: [],
    sports: [],
    filter: {
      sport: null,
      leadIds: [],
      eventTypes: [],
    },
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

    this.sports = []
    for (const event of data) {
      const sport = await this.$store.dispatch('api/sports/fetch', event.sportId)
      this.sports.push(sport)
    }

    this.items = data
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),

    dots () {
      return Object.keys(this.events)
    },

    filtered () {
      return this.items.filter((item) => {
        if (this.filter.sport) {
          if (this.filter.sport !== item.sportId) {
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

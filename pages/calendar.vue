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
            class="mr-2"
            hide-details
            style="width: 168px"
            placeholder="Filter by Sport"
            dense
            outlined
            prepend-inner-icon="$vuetify.icons.whistle"
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

          <v-btn color="primary" depressed>
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
      <div class="text-p1 info--text text--darken-1 date-pill text-center">
        {{ formattedPill(key) }}
      </div>

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
import FxCalendar from '@/components/FxCalendar/FxCalendar'
import FxDateRangePicker from '@/components/FxDateRangePicker'
import FxEventItem from '@/components/FxEventItem/FxEventItem'

export default {
  name: 'CalendarPage',
  components: {
    FxEventItem,
    FxCalendar,
    FxDateRangePicker,
  },

  data: () => ({
    dateRange: { startDate: new Date(), endDate: new Date() },
    date: null,
    events: {},
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

    this.events = groupBy(data, 'date')
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),

    dots () {
      return Object.keys(this.events)
    },

    formattedPill: () => (val) => {
      if (!val) {
        return ''
      }
      return DateTime.fromFormat(val, 'yyyy-MM-dd').toFormat('cccc d LLLL')
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

<style scoped>
.date-pill {
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  border-radius: 15px;
  width: 129px;
  height: 25px;
  line-height: 25px;
  margin: auto;
  z-index: 2;
}
/*.date-pill::before {*/
/*  content: "-";*/
/*  display: block;*/
/*  position: relative;*/
/*  width: 100%;*/
/*  height: 1px;*/
/*  background: #CBD5E1;*/
/*  top: 24px;*/
/*  left: 0;*/
/*  z-index: 1;*/
/*}*/
</style>

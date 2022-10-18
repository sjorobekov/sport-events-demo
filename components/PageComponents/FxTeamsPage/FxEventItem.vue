<template>
  <v-container :style="style" class="rounded">
    <v-row>
      <v-col cols="12" class="border-bottom pt-1 pb-0">
        <v-list-item class="px-0">
          <v-list-item-content>
            <v-list-item-title class="text-p2">
              <FxDateFormat :date="event.date" output-format="cccc dd MMMM yyyy" />
            </v-list-item-title>
          </v-list-item-content>
          <v-spacer />
        </v-list-item>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="2" xl="1" class="border-bottom pt-6">
        <v-chip
          color="info lighten-2"
          outlined
          dark
          label
          class="pr-3 radius-6 height-24"
        >
          <span class="info--text">{{ event.startTime }}</span>
        </v-chip>
      </v-col>
      <v-col cols="12" md="3" class="border-bottom">
        <FxTeamListItem class="pl-0" :participant="me" :context-school-id="contextSchoolId" :icon-on-right="!compact" />
      </v-col>
      <v-col md="2" class="hidden-sm-and-down pt-5 border-bottom text-center">
        <ExistingResult v-if="hasResult" :event="event" :me="me" />
        <NoResult v-else :me="me" :event="event" />
      </v-col>
      <v-col cols="12" md="5" class="border-bottom">
        <FxTeamListItem v-if="event.eventType === EventType.FIXTURE" class="pl-0" :participant="opponent" :context-school-id="contextSchoolId" />
        <FxNonFixtureItem v-else :event-type="event.eventType" :name="event.name" />
      </v-col>
    </v-row>
    <slot name="bottom" />
  </v-container>
</template>

<script>
import { EventResult, EventType } from '@/enum'
import ExistingResult
  from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/EventItem/ExistingResult/ExistingResult'
import NoResult from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/EventItem/NoResult/NoResult'

export default {
  name: 'FxTeamsEventItem',
  components: {
    ExistingResult,
    NoResult,
  },
  props: {
    event: {
      type: Object,
      default: () => {},
    },
    me: {
      type: Object,
      default: () => {},
    },
    opponent: {
      type: Object,
      default: () => {},
    },
    contextSchoolId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    sport: {},
    EventType,
    EventResult,
  }),

  computed: {
    compact () {
      return this.$vuetify.breakpoint.smAndDown
    },
    style () {
      return { borderLeft: `${this.sport?.color} 8px solid` }
    },
    hasResult () {
      return [
        EventResult.WIN,
        EventResult.LOST,
        EventResult.DRAW,
        EventResult['1ST'],
        EventResult['2ND'],
        EventResult['3RD'],
        EventResult.SEE_EVENT_RESULTS,
      ].includes(this.me.overallResult)
    },
  },

  async created () {
    this.sport = await this.$store.dispatch('api/sports/fetch', this.event.sportId)
  },
}
</script>

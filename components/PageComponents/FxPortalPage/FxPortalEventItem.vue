<template>
  <nuxt-link class="text-decoration-none link-width" :to="{ name: 'events-eventId', params: { eventId: event.id } }">
    <v-container style="border-bottom: 1px solid #F1F5F9">
      <v-row>
        <v-col md="2" class="pt-6">
          <FxEventStatus :overall-result="me.overallResult" />
        </v-col>
        <v-col cols="12" md="3">
          <FxTeamListItem class="pl-0" :participant="me" :context-school-id="contextSchoolId" :icon-on-right="!compact" />
        </v-col>
        <v-col md="3" class="hidden-sm-and-down pt-5 text-center">
          <ExistingResult v-if="hasResult(me.overallResult)" :event="event" :me="event.me" />
          <div v-else>
            <v-avatar rounded size="40" class="mr-2" color="#F1F5F9">
              -
            </v-avatar>
            <v-avatar rounded size="40" class="ml-2" color="#F1F5F9">
              -
            </v-avatar>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <FxTeamListItem v-if="event.eventType === EventType.FIXTURE" class="pl-0" :participant="event.opponent" :context-school-id="contextSchoolId" />
          <FxNonFixtureItem v-else :event-type="event.eventType" :name="event.name" />
        </v-col>
      </v-row>
    </v-container>
  </nuxt-link>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventType, EventResult } from '~/enum'
import ExistingResult
  from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/Desktop/EventItem/ExistingResult/ExistingResult'

export default {
  name: 'FxPortalEventItem',
  components: {
    ExistingResult,
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
  },

  data: () => ({
    EventType,
    EventResult,
  }),

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
    hasResult: () => (overallResult) => {
      return [
        EventResult.WIN,
        EventResult.LOST,
        EventResult.DRAW,
        EventResult['1ST'],
        EventResult['2ND'],
        EventResult['3RD'],
        EventResult.SEE_EVENT_RESULTS,
        EventResult.LIVE,
      ].includes(overallResult)
    },
    compact () {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
}
</script>

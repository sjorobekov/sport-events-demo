<template>
  <CalendarItemLayout :sport="event.sport" :lead="me.lead" :to="{ name: 'events-eventId', params: { eventId: event.id } }">
    <template #status>
      <FxEventStatus :overall-result="me.overallResult" />
    </template>
    <template #left="{ compact }">
      <FxTeamListItem class="pl-0" :participant="me" :context-school-id="contextSchoolId" :icon-on-right="!compact" />
    </template>
    <template #score>
      <ExistingResult v-if="hasResult" :event="event" :me="me" />
      <NoResult v-else :me="me" :event="event" />
    </template>
    <template #right>
      <FxTeamListItem v-if="event.eventType === EventType.FIXTURE" class="pl-0" :participant="opponent" :context-school-id="contextSchoolId" />
      <FxNonFixtureItem v-else :event-type="event.eventType" :name="event.name" />
    </template>
    <template #time>
      <div>
        <div v-if="me.meetTime" class="d-inline-block pr-8">
          <v-list-item-title class="text-p2 info--text text--darken-4">
            {{ me.meetTime }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-p1 info--text">
            Meet Time
          </v-list-item-subtitle>
        </div>
        <div class="d-inline-block pr-8">
          <v-list-item-title class="text-p2 info--text text--darken-4">
            {{ event.startTime }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-p1 info--text">
            Start Time
          </v-list-item-subtitle>
        </div>
        <div v-if="me.returnTime" class="d-inline-block">
          <v-list-item-title class="text-p2 info--text text--darken-4">
            {{ me.returnTime }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-p1 info--text">
            Return Time
          </v-list-item-subtitle>
        </div>
      </div>
    </template>
    <template #location>
      <FxLocationLabel :event="event" :me="me" />
    </template>
    <template #transport>
      <v-list-item v-if="!me.noNeedTransport" class="pt-2">
        <v-list-item-icon>
          <v-icon>$vuetify.icons.direction</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="py-0">
          <div>
            <div v-if="me.transportTo" class="d-block pr-8">
              <v-list-item-title class="text-p2 info--text text--darken-4">
                <v-icon>$vuetify.icons.arrowRight</v-icon> {{ transportTo }}
              </v-list-item-title>
            </div>
            <div v-if="me.transportFrom" class="d-block">
              <v-list-item-title class="text-p2 info--text text--darken-4">
                <v-icon>$vuetify.icons.arrowLeft</v-icon> {{ transportFrom }}
              </v-list-item-title>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </template>
  </CalendarItemLayout>
</template>

<script>
import { mapGetters } from 'vuex'
import FxLocationLabel from '@/components/FxEventItem/FxLocationLabel'
import { EventResult, EventType, TransportType } from '@/enum'
import ExistingResult
  from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/EventItem/ExistingResult/ExistingResult'
import NoResult from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/EventItem/NoResult/NoResult'
import CalendarItemLayout from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/CalendarItemLayout'

export default {
  name: 'EventItem',
  components: {
    CalendarItemLayout,
    NoResult,
    ExistingResult,
    FxLocationLabel,
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    sport: {},
    team: {},
    user: {},
    EventType,
    EventResult,
  }),

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),

    event () {
      return this.value
    },

    me () {
      return this.event.me
    },

    opponent () {
      return this.event.opponent
    },

    style () {
      return { borderLeft: `${this.sport?.color} 8px solid` }
    },

    transportTo () {
      if (this.me.transportTo === TransportType.OTHER) {
        return this.me.transportToOther
      }

      return this.$t(`TRANSPORT_TO.${this.me.transportTo}`)
    },

    transportFrom () {
      if (this.me.transportFrom === TransportType.OTHER) {
        return this.me.transportFromOther
      }

      return this.$t(`TRANSPORT_FROM.${this.me.transportTo}`)
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
}
</script>

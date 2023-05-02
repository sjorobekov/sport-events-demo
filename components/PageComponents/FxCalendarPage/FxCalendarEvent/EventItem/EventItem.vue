<template>
  <CalendarItemLayout :sport="event.sport" :lead="me.lead" :to="{ name: 'events-eventId', params: { eventId: event.id } }">
    <template #status>
      <v-chip
        v-if="me.overallResult === EventResult.TO_BE_PLAYED && isMobile"
        color="neutral lighten-1"
        outlined
        dark
        label
        class="pr-3 radius-16 height-24"
      >
        <span class="neutral--text text--darken-3">{{ event.startTime }}</span>
      </v-chip>
      <FxEventStatus v-else-if="me.overallResult && canSeeResults" :overall-result="me.overallResult" />
    </template>
    <template #left>
      <FxTeamListItem class="px-0" :participant="me" :context-school-id="contextSchoolId" item-class="flex-row flex-md-row-reverse text-md-right">
        <template #action>
          <v-list-item-avatar rounded width="60" class="mr-2 hidden-md-and-up" color="neutral lighten-2">
            <span class="score-text">{{ left }}</span>
          </v-list-item-avatar>
        </template>
      </FxTeamListItem>
    </template>
    <template #score>
      <FxEventResult v-if="!isLoggedIn && isResultsEventsOnly" :result="me.overallResult" />
      <ExistingResult v-else-if="hasResult" :event="event" :me="me" />
      <NoResult v-else :me="me" :event="event" />
    </template>
    <template #right>
      <FxTeamListItem v-if="event.eventType === EventType.FIXTURE" class="px-0" :participant="opponent" :context-school-id="contextSchoolId">
        <template #action>
          <v-list-item-avatar rounded width="60" class="mr-2 hidden-md-and-up" color="neutral lighten-2">
            <span class="score-text">{{ right }}</span>
          </v-list-item-avatar>
        </template>
      </FxTeamListItem>
      <FxNonFixtureItem v-else :event-type="event.eventType" :name="event.name">
        <template #action>
          <v-list-item-avatar rounded width="60" class="mr-2 hidden-md-and-up" color="neutral lighten-2">
            <span class="score-text">-</span>
          </v-list-item-avatar>
        </template>
      </FxNonFixtureItem>
    </template>
    <template #time>
      <div>
        <v-list-item-title class="text-p2 neutral--text text--darken-4">
          {{ me.meetTime || event.startTime }} - {{ me.returnTime || event.endTime }}
        </v-list-item-title>
      </div>
    </template>
    <template #location>
      <FxLocationLabel :event="event" :me="me" />
    </template>
  </CalendarItemLayout>
</template>

<script>
import { mapGetters } from 'vuex'
import FxLocationLabel from '~/components/FxEventItem/FxLocationLabel.vue'
import { EventResult, EventType, TransportType, PublishResult } from '~/enum'
import ExistingResult
  from '~/components/PageComponents/FxCalendarPage/FxCalendarEvent/EventItem/ExistingResult/ExistingResult.vue'
import NoResult from '~/components/PageComponents/FxCalendarPage/FxCalendarEvent/EventItem/NoResult/NoResult.vue'
import CalendarItemLayout from '~/components/PageComponents/FxCalendarPage/FxCalendarEvent/CalendarItemLayout.vue'
import FxEventStatus from '~/components/FxEventStatus.vue'
import FxEventResult from '~/components/FxEventResult.vue'

export default {
  name: 'EventItem',
  components: {
    FxEventStatus,
    CalendarItemLayout,
    NoResult,
    ExistingResult,
    FxLocationLabel,
    FxEventResult,
  },
  props: {
    value: {
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
      isLoggedIn: 'context/isLoggedIn',
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
        EventResult.SEE_MATCH_NOTES,
      ].includes(this.me.overallResult)
    },

    myTeam () {
      return this.event.me.team
    },

    isResultsEventsOnly () {
      return [PublishResult.RESULTS, PublishResult.EVENTS].includes(this.myTeam?.publishResults)
    },

    canSeeResults () {
      return [PublishResult.RESULTS, PublishResult.RESULTS_SCORES].includes(this.myTeam?.publishResults)
    },

    isMobile () {
      return this.$vuetify.breakpoint.smAndDown
    },

    left () {
      if (this.event.eventType !== EventType.FIXTURE) {
        return '-'
      }

      if (!this.me.results) {
        return '-'
      }
      return this.me.results[0].score || '-'
    },

    right () {
      if (!this.me.results) {
        return '-'
      }
      return this.me.results[0].opponentScore || '-'
    },
  },
}
</script>
<style lang="scss" scoped>
.radius-16 {
  border-radius: 16px!important;
}
.score-text {
  color: var(--v-neutral-darken4);
}
</style>

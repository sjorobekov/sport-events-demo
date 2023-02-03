<template>
  <FxTeamEventContainer>
    <template #date>
      <v-list-item class="px-0">
        <v-list-item-content>
          <v-list-item-title class="text-p2">
            <FxDateFormat :date="event.date" output-format="cccc dd MMMM yyyy" />
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-chip
            v-if="me.overallResult === EventResult.TO_BE_PLAYED"
            color="info lighten-2"
            outlined
            dark
            label
            class="pr-3 radius-6 height-24"
          >
            <span class="info--text">{{ event.startTime }}</span>
          </v-chip>
          <FxEventStatus v-else-if="me.overallResult && canSeeResults" :overall-result="me.overallResult" />
        </v-list-item-action>
      </v-list-item>
    </template>

    <template #left>
      <v-list-item class="flex-md-row-reverse px-0">
        <v-list-item-avatar class="mx-3">
          <FxSchoolLogo :value="contextSchool.logo" :alt="contextSchool.name" :color="contextSchool.color" />
        </v-list-item-avatar>
        <v-list-item-content class="text-md-right">
          <v-list-item-title :class="'text-p2 font-weight-bold'">
            {{ me.team.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <template #right>
      <v-list-item v-if="event.eventType === EventType.FIXTURE" class="px-0">
        <v-list-item-avatar class="mx-3">
          <FxSchoolLogo :value="opponent.school.logo" :alt="opponent.school.name" :color="opponent.school.color" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title :class="'text-p2 font-weight-bold'">
            {{ opponent.school.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <FxNonFixtureItem v-else :event-type="event.eventType" :name="event.name" />
    </template>

    <template #score>
      <FxEventResult v-if="!isLoggedIn && isResultsEventsOnly" :result="me.overallResult" />
      <ExistingResult v-else-if="hasResult" :event="event" :me="me" />
      <NoResult v-else :me="me" :event="event" />
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
  </FxTeamEventContainer>
</template>

<script>
import { mapGetters } from 'vuex'
import FxTeamEventContainer from './FxTeamEventDesktopLayout'
import { EventResult, EventType, PublishResult } from '@/enum'
import ExistingResult
  from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/Desktop/EventItem/ExistingResult/ExistingResult'
import NoResult from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/Desktop/EventItem/NoResult/NoResult'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'
import FxLocationLabel from '@/components/FxEventItem/FxLocationLabel'
import FxEventResult from '@/components/FxEventResult'

export default {
  name: 'FxTeamsEventItem',
  components: {
    FxTeamEventContainer,
    FxLocationLabel,
    FxSchoolLogo,
    ExistingResult,
    NoResult,
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
      contextSchool: 'context/school',
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

    myTeam () {
      return this.me.team
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

    isResultsEventsOnly () {
      return [PublishResult.RESULTS, PublishResult.EVENTS].includes(this.myTeam?.publishResults)
    },

    canSeeResults () {
      return [PublishResult.RESULTS, PublishResult.RESULTS_SCORES].includes(this.myTeam?.publishResults)
    },
  },
}
</script>

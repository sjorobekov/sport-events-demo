<template>
  <FxTeamEventContainer>
    <template #date>
      <v-list-item class="px-0">
        <v-list-item-content>
          <v-list-item-title class="text-p2 neutral--text text--darken-3">
            <FxDateFormat :date="event.date" output-format="cccc dd MMMM yyyy" />
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-chip
            v-if="me.overallResult === EventResult.TO_BE_PLAYED"
            color="neutral lighten-1"
            outlined
            dark
            label
            class="pr-3 radius-16 height-24"
          >
            <span class="neutral--text text--darken-3">{{ event.startTime }}</span>
          </v-chip>
          <FxEventStatus v-else-if="me.overallResult && canSeeResults" :overall-result="me.overallResult" />
        </v-list-item-action>
      </v-list-item>
    </template>

    <template #left>
      <v-list-item class="flex-md-row-reverse px-0">
        <v-list-item-avatar class="mx-1">
          <FxSchoolLogo :value="contextSchool.logo" :alt="contextSchool.name" :color="contextSchool.color" />
        </v-list-item-avatar>
        <v-list-item-content class="text-md-right">
          <v-list-item-title class="text-p2 font-weight-bold  pl-2 pl-md-0 neutral--text text--darken-4">
            {{ me.team.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar rounded width="60" class="mr-2 hidden-md-and-up neutral--text text--darken-4" color="neutral lighten-3">
          {{ left }}
        </v-list-item-avatar>
      </v-list-item>
    </template>

    <template #right>
      <v-list-item v-if="event.eventType === EventType.FIXTURE" class="px-0">
        <v-list-item-avatar class="mx-1">
          <FxSchoolLogo :value="opponentSchool.logo" :alt="opponentName" :color="opponentSchool.color" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-p2 font-weight-bold  pl-2 pl-md-0 neutral--text text--darken-4">
            {{ opponentName }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar rounded width="60" class="mr-2 hidden-md-and-up neutral--text text--darken-4" color="neutral lighten-3">
          {{ right }}
        </v-list-item-avatar>
      </v-list-item>
      <FxNonFixtureItem v-else :event-type="event.eventType" :name="event.name">
        <template #action>
          <v-list-item-avatar rounded width="60" class="mr-2 hidden-md-and-up neutral--text text--darken-4" color="neutral lighten-3">
            -
          </v-list-item-avatar>
        </template>
      </FxNonFixtureItem>
    </template>

    <template #score>
      <FxEventResult v-if="!isLoggedIn && isResultsEventsOnly" :result="me.overallResult" />
      <ExistingResult v-else-if="hasResult" :event="event" :me="me" />
      <NoResult v-else :me="me" :event="event" />
    </template>

    <template #time>
      <div>
        <div v-if="me.meetTime" class="d-inline-block pr-8">
          <v-list-item-title class="text-p2 neutral--text text--darken-4">
            {{ me.meetTime }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
            Meet Time
          </v-list-item-subtitle>
        </div>
        <div class="d-inline-block pr-8">
          <v-list-item-title class="text-p2 neutral--text text--darken-4">
            {{ event.startTime }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
            Start Time
          </v-list-item-subtitle>
        </div>
        <div v-if="me.returnTime" class="d-inline-block">
          <v-list-item-title class="text-p2 neutral--text text--darken-4">
            {{ me.returnTime }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
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
  from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/EventItem/ExistingResult/ExistingResult'
import NoResult from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/EventItem/NoResult/NoResult'
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

    opponentName () {
      return this.opponent.school ? this.opponent.school.name : this.opponent.opponent.name
    },

    opponentSchool () {
      return this.opponent.school || {}
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
<style scoped>
.v-chip--label {
  border-radius: 16px!important;
}
</style>

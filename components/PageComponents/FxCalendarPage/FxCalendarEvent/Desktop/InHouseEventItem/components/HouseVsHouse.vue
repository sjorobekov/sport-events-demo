<template>
  <FxCalendarItem :sport="sport" :lead="lead" :to="{ name: 'in-house-competitionId-matches-matchId', params: { matchId: value.id, competitionId: competition.id } }">
    <template #subtitle>
      <span class="text-p2 info--text text--lighten-1">In-House {{ competition.name }}</span>
    </template>
    <template #status>
      <FxInHouseMatchStatus v-if="value.overallResult" :overall-result="value.overallResult" />
    </template>
    <template #left>
      <FxInHouseTeamListItem class="px-0" :participant="value.homeTeam" :icon-on-right="true" />
    </template>
    <template #right>
      <FxInHouseTeamListItem class="px-0" :participant="value.awayTeam" />
    </template>
    <template #score>
      <ExistingResult v-if="hasResult" :match="value" />
      <NoResult v-else :competition="competition" :match="value" />
    </template>
    <template #time>
      <div>
        <div v-if="value.startTime" class="d-inline-block pr-8">
          <v-list-item-title class="text-p2 info--text text--darken-4">
            {{ value.startTime }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-p1 info--text">
            Start Time
          </v-list-item-subtitle>
        </div>
        <div class="d-inline-block pr-8">
          <v-list-item-title class="text-p2 info--text text--darken-4">
            {{ value.finishTime }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-p1 info--text">
            Finish Time
          </v-list-item-subtitle>
        </div>
      </div>
    </template>
    <template #location>
      <span>{{ locationLabel }}</span>
    </template>
  </FxCalendarItem>
</template>

<script>
import ExistingResult from './ExistingResult/ExistingResult'
import FxCalendarItem from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/Desktop/CalendarItemLayout'
import { InHouseEventResult } from '@/enum'
import NoResult
  from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/Desktop/InHouseEventItem/components/NoResult/NoResult'

export default {
  name: 'HouseVsHouse',
  components: { NoResult, ExistingResult, FxCalendarItem },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  computed: {
    event () {
      return this.value.inHouseEvent
    },

    competition () {
      return this.value.inHouseEvent.inHouseCompetition
    },

    sport () {
      return this.competition.sport
    },

    lead () {
      return this.event.lead
    },

    hasResult () {
      return [
        InHouseEventResult.HOME,
        InHouseEventResult.AWAY,
        InHouseEventResult.DRAW,
        InHouseEventResult.SEE_MATCH_NOTES,
      ].includes(this.value.overallResult)
    },

    locationLabel () {
      if (this.value.sportLocation) {
        return this.value.sportLocation.name
      }

      return this.value.otherLocation
    },
  },
}
</script>

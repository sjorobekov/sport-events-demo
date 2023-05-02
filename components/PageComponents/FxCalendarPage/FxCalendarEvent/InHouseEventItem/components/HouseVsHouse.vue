<template>
  <FxCalendarItem :sport="sport" :lead="lead" :to="{ name: 'in-house-competitionId-matches-matchId', params: { matchId: value.id, competitionId: competition.id } }">
    <template #subtitle>
      <span class="text-p2 neutral--text text--darken-2">({{ competition.name }})</span>
    </template>
    <template #status>
      <FxInHouseMatchStatus v-if="value.overallResult" :overall-result="value.overallResult" />
    </template>
    <template #left>
      <FxInHouseTeamListItem class="px-0" :participant="value.homeTeam" item-class="flex-row flex-md-row-reverse text-md-right">
        <template #action>
          <v-list-item-avatar rounded width="60" class="mr-2 hidden-md-and-up" color="neutral lighten-2">
            <span class="in-house-score">{{ homeScore }}</span>
          </v-list-item-avatar>
        </template>
      </FxInHouseTeamListItem>
    </template>
    <template #right>
      <FxInHouseTeamListItem class="px-0" :participant="value.awayTeam">
        <template #action>
          <v-list-item-avatar rounded width="60" class="mr-2 hidden-md-and-up" color="neutral lighten-2">
            <span class="in-house-score">{{ awayScore }}</span>
          </v-list-item-avatar>
        </template>
      </FxInHouseTeamListItem>
    </template>
    <template #score>
      <ExistingResult v-if="hasResult" :match="value" />
      <NoResult v-else :competition="competition" :match="value" />
    </template>
    <template #time>
      <v-list-item-title class="text-p2 neutral--text text--darken-4">
        {{ value.startTime }} - {{ value.finishTime }}
      </v-list-item-title>
    </template>
    <template #location>
      <span>{{ locationLabel }}</span>
    </template>
  </FxCalendarItem>
</template>

<script>
import ExistingResult from './ExistingResult/ExistingResult.vue'
import FxCalendarItem from '~/components/PageComponents/FxCalendarPage/FxCalendarEvent/CalendarItemLayout.vue'
import { InHouseEventResult } from '~/enum'
import NoResult
  from '~/components/PageComponents/FxCalendarPage/FxCalendarEvent/InHouseEventItem/components/NoResult/NoResult.vue'

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

    homeScore () {
      return this.value.homeScore || '-'
    },

    awayScore () {
      return this.value.awayScore || '-'
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
<style scoped>
.in-house-score {
  color: var(--v-neutral-darken4);
}
</style>

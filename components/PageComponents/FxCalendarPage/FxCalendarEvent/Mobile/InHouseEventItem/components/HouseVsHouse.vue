<template>
  <FxCalendarEventMobileLayout :sport="sport" :to="{ name: 'in-house-competitionId-matches-matchId', params: { matchId: value.id, competitionId: competition.id } }">
    <template #subtitle>
      <span class="text-p2 info--text text--lighten-1">In-House {{ competition.name }}</span>
    </template>

    <template #status>
      <v-chip
        v-if="value.overallResult === InHouseEventResult.TO_BE_PLAYED"
        color="info lighten-2"
        outlined
        dark
        label
        class="pr-3 radius-6 height-24"
      >
        <span class="info--text">{{ event.startTime }}</span>
      </v-chip>
      <FxInHouseMatchStatus v-else-if="value.overallResult" :overall-result="value.overallResult" />
    </template>

    <FxInHouseTeamListItem class="px-0" :participant="value.homeTeam">
      <template #action>
        <v-list-item-avatar rounded size="40" class="mr-2" color="info lighten-4">
          {{ homeScore }}
        </v-list-item-avatar>
      </template>
    </FxInHouseTeamListItem>
    <FxInHouseTeamListItem class="px-0" :participant="value.awayTeam">
      <template #action>
        <v-list-item-avatar rounded size="40" class="mr-2" color="info lighten-4">
          {{ awayScore }}
        </v-list-item-avatar>
      </template>
    </FxInHouseTeamListItem>
  </FxCalendarEventMobileLayout>
</template>

<script>
import FxCalendarEventMobileLayout from '../../FxCalendarEventMobileLayout'
import { InHouseEventResult } from '@/enum'

export default {
  name: 'HouseVsHouse',
  components: {
    FxCalendarEventMobileLayout,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    InHouseEventResult,
  }),

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

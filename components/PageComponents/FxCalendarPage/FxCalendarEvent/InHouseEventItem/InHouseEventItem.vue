<template>
  <FxCalendarItem :sport="sport" :lead="lead" :to="{ name: 'in-house-competitionId-matches-matchId', params: { matchId: value.id, competitionId: competition.id } }">
    <template #headerLabel>
      <span class="text-p2 info--text text--lighten-1">In-House</span>
    </template>
    <template #left="{ compact }">
      <FxInHouseTeamListItem class="pl-0" :participant="value.homeTeam" :icon-on-right="!compact" />
    </template>
    <template #right>
      <FxInHouseTeamListItem class="pl-0" :participant="value.awayTeam" />
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
  </FxCalendarItem>
</template>

<script>
import FxCalendarItem from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/CalendarItemLayout'
export default {
  name: 'InHouseEventItem',
  components: { FxCalendarItem },
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
  },
}
</script>

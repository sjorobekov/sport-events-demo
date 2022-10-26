<template>
  <FxCalendarItem :sport="sport" :lead="lead" :to="{ name: 'in-house-competitionId-matches-matchId', params: { matchId: value.id, competitionId: competition.id } }">
    <template #subtitle>
      <span class="text-p2 info--text text--lighten-1">In-House {{ competition.name }}</span>
    </template>
    <template v-if="value.overallResult" #status>
      <FxInHouseMatchStatus :overall-result="value.overallResult" />
    </template>
    <template #center>
      <v-col md="4" class="border-bottom pt-4 text-right">
        All Houses
      </v-col>

      <v-col md="4" class="border-bottom pt-3">
        <AllInHouseTeamsProvider class="text-center">
          <template #default="{ teams }">
            <FxSchoolLogo v-for="team in teams" :key="team.id" :color="team.color" :alt="team.name" size="40" />
          </template>
        </AllInHouseTeamsProvider>
      </v-col>
      <v-col md="4" class="border-bottom pt-4">
        {{ competition.name }}
      </v-col>
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
import FxCalendarItem from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/Desktop/CalendarItemLayout'
import AllInHouseTeamsProvider
  from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/Desktop/InHouseEventItem/components/AllInHouseTeamsProvider'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

export default {
  name: 'AllHouses',
  components: { FxSchoolLogo, AllInHouseTeamsProvider, FxCalendarItem },
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

    locationLabel () {
      if (this.value.sportLocation) {
        return this.value.sportLocation.name
      }

      return this.value.otherLocation
    },
  },
}
</script>

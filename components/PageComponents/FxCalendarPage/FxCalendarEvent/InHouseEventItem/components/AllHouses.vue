<template>
  <FxCalendarItem :sport="sport" :lead="lead" :to="{ name: 'in-house-competitionId-matches-matchId', params: { matchId: value.id, competitionId: competition.id } }">
    <template #subtitle>
      <span class="text-p2 neutral--text text--darken-2">({{ competition.name }})</span>
    </template>
    <template v-if="value.overallResult" #status>
      <FxInHouseMatchStatus :overall-result="value.overallResult" />
    </template>
    <template #center>
      <v-list-item class="text-md-right">
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold neutral--text text--darken-4">
            All Houses
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <div class="hidden-sm-and-down">
        <AllInHouseTeamsProvider class="d-flex flex-nowrap justify-center align-center" style="height: 56px">
          <template #default="{ teams }">
            <FxSchoolLogo v-for="team in teams" :key="team.id" :color="team.color" :alt="team.name" size="40" />
          </template>
        </AllInHouseTeamsProvider>
      </div>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-p2 font-weight-bold neutral--text text--darken-4">
            {{ event.name || competition.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
import FxCalendarItem from '~/components/PageComponents/FxCalendarPage/FxCalendarEvent/CalendarItemLayout.vue'
import AllInHouseTeamsProvider
  from '~/components/PageComponents/FxCalendarPage/FxCalendarEvent/InHouseEventItem/components/AllInHouseTeamsProvider.vue'
import FxSchoolLogo from '~/components/FxSchoolLogo/FxSchoolLogo.vue'

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

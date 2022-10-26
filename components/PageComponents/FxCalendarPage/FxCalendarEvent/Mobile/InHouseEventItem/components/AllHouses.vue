<template>
  <FxCalendarEventMobileLayout :sport="sport" :to="{ name: 'in-house-competitionId-matches-matchId', params: { matchId: value.id, competitionId: competition.id } }">
    <template #subtitle>
      <span class="text-p2 info--text text--lighten-1">In-House {{ competition.name }}</span>
    </template>
    <template #status>
      <v-chip
        v-if="!datePassed"
        color="info lighten-2"
        outlined
        dark
        label
        class="pr-3 radius-6 height-24"
      >
        <span class="info--text">{{ value.startTime }}</span>
      </v-chip>
      <FxInHouseMatchStatus v-else-if="value.overallResult" :overall-result="value.overallResult" />
    </template>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-p2">
          All Houses
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-p2">
          {{ competition.name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </FxCalendarEventMobileLayout>
</template>

<script>
import { DateTime } from 'luxon'
import FxCalendarEventMobileLayout from '../../FxCalendarEventMobileLayout'
import { InHouseEventResult } from '@/enum'

export default {
  name: 'AllHouses',
  components: { FxCalendarEventMobileLayout },

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

    datePassed () {
      const today = DateTime.local().toFormat('yyyy-MM-dd')
      return today >= this.event.date
    },
  },
}
</script>

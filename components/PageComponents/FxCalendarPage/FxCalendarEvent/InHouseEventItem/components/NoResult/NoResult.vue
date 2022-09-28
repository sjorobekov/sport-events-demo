<template>
  <div>
    <v-btn v-if="datePassed" outlined link :to="{ name: 'in-house-competitionId-matches-matchId', params: { matchId: match.id, competitionId: competition.id } }">
      Add Result
    </v-btn>

    <v-btn v-else outlined link :to="{ name: 'in-house-competitionId-matches-matchId', params: { matchId: match.id, competitionId: competition.id } }">
      Manage Teams
    </v-btn>
  </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'NoResult',
  props: {
    match: {
      type: Object,
      required: true,
    },
    competition: {
      type: Object,
      required: true,
    },
  },

  computed: {
    datePassed () {
      const today = DateTime.local().toFormat('yyyy-MM-dd')
      return today >= this.match.date
    },
  },
}
</script>

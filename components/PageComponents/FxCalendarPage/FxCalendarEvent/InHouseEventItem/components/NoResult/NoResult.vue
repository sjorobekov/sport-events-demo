<template>
  <div>
    <v-btn v-if="datePassed && canAddMissingResults" outlined link :to="{ name: 'in-house-competitionId-matches-matchId', params: { matchId: match.id, competitionId: competition.id } }">
      Add Result
    </v-btn>

    <v-btn v-else-if="canManageTeams" outlined link :to="{ name: 'in-house-competitionId-matches-matchId', params: { matchId: match.id, competitionId: competition.id } }">
      Manage Teams
    </v-btn>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'

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
    ...mapGetters({
      canAddMissingResults: 'user/acl/canAddMissingResults',
      canManageTeams: 'page/inHouseEvent/canManageTeamSheet',
    }),
    datePassed () {
      const today = DateTime.local().toFormat('yyyy-MM-dd')
      return today >= this.match.date
    },
  },
}
</script>

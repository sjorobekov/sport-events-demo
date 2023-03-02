<template>
  <v-card class="rounded-t-0" height="152">
    <v-row v-if="inHouseEvent.eventType === InHouseEventType.HOUSE_VS_HOUSE" no-gutters class="pa-6">
      <v-col cols="4">
        <FxTeam :color="myTeam.color" :logo="myTeam.logo" :name="myTeam.name" />
      </v-col>
      <v-col cols="4" class="text-center">
        <FxInHouseEventResultCenterBoard />
      </v-col>
      <v-col cols="4">
        <FxTeam class="pl-0" :name="opponentTeam.name" :color="opponentTeam.color" :logo="opponentTeam.logo" />
      </v-col>
    </v-row>

    <div v-else class="py-6 d-flex gap-md justify-center">
      <v-slide-group
        show-arrows
      >
        <v-slide-item
          v-for="team in teams"
          :key="team.id"
        >
          <FxTeam
            class="mx-1 mx-md-2"
            style="min-width: 110px"
            :name="team.name"
            :color="team.color"
            :logo="team.logo"
          />
        </v-slide-item>
      </v-slide-group>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import { InHouseEventType, EventResult } from '@/enum'
import FxTeam from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventTeam'
import FxInHouseEventResultCenterBoard from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventResultCenterBoard'

export default {
  name: 'FxInHouseEventScoreBoardCard',
  components: {
    FxInHouseEventResultCenterBoard,
    FxTeam,
  },
  data: () => ({
    InHouseEventType,
    EventResult,
    DATE_HUGE: DateTime.DATE_HUGE,
  }),
  computed: {
    ...mapGetters({
      inHouseEvent: 'page/inHouseEvent/inHouseEvent',
      school: 'context/school',
      myTeam: 'page/inHouseEvent/myTeam',
      opponentTeam: 'page/inHouseEvent/opponentTeam',
      teams: 'page/inHouseEvent/teams',
    }),
  },
}
</script>

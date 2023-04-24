<template>
  <v-card class="rounded-t-0 score-card">
    <table v-if="inHouseEvent.eventType === InHouseEventType.HOUSE_VS_HOUSE" style="width: 100%" class="pa-5">
      <tbody>
        <tr class="hover-none">
          <td class="text-center team-cell pb-2 pb-md-3">
            <FxTeam :color="myTeam.color" :logo="myTeam.logo" :name="myTeam.name" />
          </td>
          <td rowspan="2">
            <FxInHouseEventResultCenterBoard />
          </td>
          <td class="text-center team-cell pb-2 pb-md-3">
            <FxTeam class="pl-0" :name="opponentTeam.name" :color="opponentTeam.color" :logo="opponentTeam.logo" />
          </td>
        </tr>
      </tbody>
    </table>

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
<style scoped lang="sass">
@import '~vuetify/src/styles/styles.sass'
.team-cell
  width: 40%
.score-card
  border-top-left-radius: 0!important
  border-top-right-radius: 0!important
  border-bottom-left-radius: 12px!important
  border-bottom-right-radius: 12px!important

.hover-none:hover
  background-color: white!important

@media #{map-get($display-breakpoints, 'sm-and-down')}

  .score-card.v-card
    border-radius: 0!important
    border: 0!important
</style>

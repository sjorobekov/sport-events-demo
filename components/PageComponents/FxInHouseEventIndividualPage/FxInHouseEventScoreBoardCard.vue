<template>
  <v-card class="rounded-t-0" height="152">
    <v-row v-if="inHouseEvent.eventType === InHouseEventType.HOUSE_VS_HOUSE" no-gutters class="pa-6">
      <v-col cols="4">
        <nuxt-link class="text-decoration-none" :to="{ name: 'teams-id', params: { id: myTeam.id } }">
          <FxTeam :color="myTeam.color" :logo="school.logo" :name="myTeam.name" />
        </nuxt-link>
      </v-col>
      <v-col cols="4" class="text-center">
        <FxInHouseEventResultCenterBoard />
      </v-col>
      <v-col cols="4">
        <wrapped-component :wrap="!!opponentLink">
          <template #wrapper>
            <a :href="opponentLink" class="text-decoration-none" />
          </template>
          <FxTeam class="pl-0" :name="opponentTeam.name" :color="opponentTeam.color" :logo="opponentTeam.logo" />
        </wrapped-component>
      </v-col>
    </v-row>
    <v-row v-else no-gutters class="pa-6">
      <v-col v-for="team in teams" :key="team.id" cols="4">
        <wrapped-component :wrap="!!opponentLink">
          <template #wrapper>
            <a :href="opponentLink" class="text-decoration-none" />
          </template>
          <FxTeam class="pl-0" :name="opponentTeam.name" :color="opponentTeam.color" :logo="opponentTeam.logo" />
        </wrapped-component>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import { InHouseEventType, EventResult } from '@/enum'
import FxTeam from '@/components/PageComponents/FxEventIndividualPage/FxEventTeam'
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
    opponentLink () {
      if (this.opponentTeam.portalAddress) {
        return this.$config.PORTAL_WILDCARD.replace('*', this.opponentTeam.portalAddress)
      }
      return false
    },
  },
}
</script>

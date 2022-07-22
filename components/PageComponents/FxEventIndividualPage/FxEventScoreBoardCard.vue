<template>
  <v-card class="rounded-t-0" height="152">
    <v-row no-gutters class="pa-6">
      <v-col cols="4">
        <FxTeam :color="school.color" :logo="school.logo" :name="myTeam.name" />
      </v-col>
      <v-col cols="4" class="text-center">
        <FxEventResultCenterBoard />
      </v-col>
      <v-col cols="4">
        <FxTeam v-if="event.eventType === EventType.FIXTURE" class="pl-0" :name="opponentTeam.name" :color="opponentTeam.color" :logo="opponentTeam.logo" />
        <FxEventNonFixture v-else :event-type="event.eventType" :name="event.name" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import { EventType, EventResult } from '@/enum'
import FxTeam from '@/components/PageComponents/FxEventIndividualPage/FxEventTeam'
import FxEventNonFixture from '@/components/PageComponents/FxEventIndividualPage/FxEventNonFixture'
import FxEventResultCenterBoard from '@/components/PageComponents/FxEventIndividualPage/FxEventResultCenterBoard'

export default {
  name: 'FxEventScoreBoardCard',
  components: {
    FxEventResultCenterBoard,
    FxTeam,
    FxEventNonFixture,
  },
  data: () => ({
    EventType,
    EventResult,
    DATE_HUGE: DateTime.DATE_HUGE,
  }),
  computed: {
    ...mapGetters({
      event: 'page/event/event',
      school: 'context/school',
      myTeam: 'page/event/myTeam',
      opponentTeam: 'page/event/opponentTeam',
    }),
  },
}
</script>

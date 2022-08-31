<template>
  <component :is="item[inHouseEvent.eventType]" />
</template>

<script>
import { mapGetters } from 'vuex'
import { InHouseEventType } from '@/enum'
import HouseVsHouseResult from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventExistingResult/components/HouseVsHouseResult'
import AllHousesResult
  from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventExistingResult/components/AllHousesResult'

export default {
  name: 'FxInHouseEventExistingResult',
  components: {
    HouseVsHouseResult,
    AllHousesResult,
  },

  data: () => ({
    item: {
      [InHouseEventType.HOUSE_VS_HOUSE]: 'HouseVsHouseResult',
      [InHouseEventType.ALL_HOUSES]: 'AllHousesResult',
    },
  }),

  computed: {
    ...mapGetters({
      inHouseEvent: 'page/inHouseEvent/inHouseEvent',
      contextSchool: 'context/school',
      myTeam: 'page/inHouseEvent/myTeam',
      opponentTeam: 'page/inHouseEvent/opponentTeam',
      result: 'page/inHouseEvent/result',
      hasResult: 'page/inHouseEvent/hasResult',
    }),
  },
}
</script>

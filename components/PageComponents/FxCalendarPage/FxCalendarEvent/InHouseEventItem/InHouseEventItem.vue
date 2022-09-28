<template>
  <component :is="component[eventType]" :value="value" />
</template>

<script>
import AllHouses from './components/AllHouses'
import HouseVsHouse from './components/HouseVsHouse'
import { InHouseEventType } from '@/enum'

export default {
  name: 'InHouseEventItem',
  components: { AllHouses, HouseVsHouse },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    component: {
      [InHouseEventType.HOUSE_VS_HOUSE]: 'HouseVsHouse',
      [InHouseEventType.ALL_HOUSES]: 'AllHouses',
    },
  }),

  computed: {
    eventType () {
      return this.value.inHouseEvent.eventType
    },
  },
}
</script>

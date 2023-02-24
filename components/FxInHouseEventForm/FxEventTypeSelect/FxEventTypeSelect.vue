<template>
  <v-item-group
    :value="value"
    mandatory
    @change="$emit('input', $event)"
  >
    <FxSheetOption
      v-for="item in items"
      :key="item.value"
      :src="item.img"
      :text="item.text"
      :value="item.value"
    />
  </v-item-group>
</template>

<script>
import houseVsHouse from './house_vs_house.svg'
import allHouses from './all_houses.svg'

import { InHouseEventType } from '@/enum'

export default {
  name: 'FxEventTypeSelect',
  props: {
    value: {
      type: String,
      default: undefined,
    },

    items: {
      type: Array,
      default: () => [
        { value: InHouseEventType.HOUSE_VS_HOUSE, text: 'House vs House', img: houseVsHouse },
        { value: InHouseEventType.ALL_HOUSES, text: 'All Houses', img: allHouses },
      ],
    },
  },
}
</script>

<template>
  <v-item-group
    v-model="selected"
    mandatory
  >
    <FxSheetOption
      v-for="item in items"
      :key="item.value"
      :src="item.img"
      :text="item.text"
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

  computed: {
    selected: {
      set (val) {
        this.$emit('input', this.items[val]?.value)
      },
      get () {
        return this.items.findIndex(item => item.value === this.value)
      },
    },
  },
}
</script>

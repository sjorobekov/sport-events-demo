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
import sportsLocation from './sportsLocation.svg'
import opponentConfirms from './opponentConfirms.svg'
import other from './other.svg'

import { SPORTS_LOCATIONS, OPPONENT_CONFIRMS, OTHER } from '@/enum/EventLocationType'

export default {
  name: 'FxEventLocationTypeSelect',
  props: {
    value: {
      type: String,
      default: undefined,
    },

    items: {
      type: Array,
      default: () => [
        { value: SPORTS_LOCATIONS, text: 'Sports Locations', img: sportsLocation },
        { value: OPPONENT_CONFIRMS, text: 'Opponent Confirms', img: opponentConfirms },
        { value: OTHER, text: 'Other', img: other },
      ],
    },
  },

  computed: {
    selected: {
      set (val) {
        this.$emit('input', this.items[val].value)
      },
      get () {
        return this.items.findIndex(item => item.value === this.value)
      },
    },
  },
}
</script>

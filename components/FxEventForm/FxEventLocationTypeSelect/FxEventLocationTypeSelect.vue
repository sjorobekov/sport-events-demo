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

import { EventLocationType } from '@/enum'

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
        { value: EventLocationType.SPORTS_LOCATIONS, text: 'Sports Locations', img: sportsLocation },
        { value: EventLocationType.OPPONENT_CONFIRMS, text: 'Opponent Confirms', img: opponentConfirms },
        { value: EventLocationType.OTHER, text: 'Other', img: other },
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

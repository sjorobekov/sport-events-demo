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

    showOpponentConfirms: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    items () {
      return [
        { value: EventLocationType.SPORTS_LOCATIONS, text: 'Sports Locations', img: sportsLocation },
        ...(this.showOpponentConfirms ? [{ value: EventLocationType.OPPONENT_CONFIRMS, text: 'Opponent Confirms', img: opponentConfirms }] : []),
        { value: EventLocationType.OTHER, text: 'Other', img: other },
      ]
    },
  },
}
</script>

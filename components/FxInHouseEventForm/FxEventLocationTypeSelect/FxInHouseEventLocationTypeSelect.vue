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
import other from './other.svg'

import { EventLocationType } from '@/enum'

export default {
  name: 'FxInHouseEventLocationTypeSelect',
  props: {
    value: {
      type: String,
      default: undefined,
    },

    items: {
      type: Array,
      default: () => [
        { value: EventLocationType.SPORTS_LOCATIONS, text: 'Sports Locations', img: sportsLocation },
        { value: EventLocationType.OTHER, text: 'Other', img: other },
      ],
    },
  },
}
</script>

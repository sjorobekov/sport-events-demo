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
import home from './home.svg'
import away from './away.svg'
import neutral from './neutral.svg'

import { EventLocation } from '@/enum'

export default {
  name: 'FxEventLocationSelect',
  props: {
    value: {
      type: String,
      default: undefined,
    },

    items: {
      type: Array,
      default: () => [
        { value: EventLocation.HOME, text: 'Home', img: home },
        { value: EventLocation.NEUTRAL, text: 'Neutral', img: neutral },
        { value: EventLocation.AWAY, text: 'Away', img: away },
      ],
    },
  },
}
</script>

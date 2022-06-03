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
import home from './home.svg'
import away from './away.svg'
import neutral from './neutral.svg'

import { HOME, AWAY, NEUTRAL } from '@/enum/EventLocation'

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
        { value: HOME, text: 'Home', img: home },
        { value: NEUTRAL, text: 'Neutral', img: neutral },
        { value: AWAY, text: 'Away', img: away },
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

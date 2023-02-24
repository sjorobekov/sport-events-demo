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
import scoreboard from './scoreboard.svg'
import win from './win.svg'
import calendar from './calendar.svg'
import { PublishResult } from '~/enum'

export default {
  name: 'FxPublishResultsSelect',
  props: {
    value: {
      type: String,
      default: undefined,
    },

    items: {
      type: Array,
      default: () => [
        { value: PublishResult.RESULTS_SCORES, text: 'Scores', img: scoreboard },
        { value: PublishResult.RESULTS, text: 'Results', img: win },
        { value: PublishResult.EVENTS, text: 'Events', img: calendar },
      ],
    },
  },
}
</script>

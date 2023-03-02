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
import fixture from './fixture.svg'
import multiEvent from './multiEvent.svg'
import tournament from './tournament.svg'
import training from './training.svg'

import { EventType } from '@/enum'

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
        { value: EventType.FIXTURE, text: 'Fixture', img: fixture },
        { value: EventType.TOURNAMENT, text: 'Tournament', img: tournament },
        { value: EventType.MULTI_EVENT, text: 'Multi-Event', img: multiEvent },
        { value: EventType.TRAINING, text: 'Training', img: training },
      ],
    },
  },
}
</script>

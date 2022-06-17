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

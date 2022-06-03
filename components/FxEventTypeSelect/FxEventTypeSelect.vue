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
import blockFixture from './blockFixture.svg'
import fixture from './fixture.svg'
import multiEvent from './multiEvent.svg'
import tournament from './tournament.svg'
import training from './training.svg'

import { FIXTURE, BLOCK_FIXTURE, MULTI_EVENT, TRAINING, TOURNAMENT } from '@/enum/EventType'

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
        { value: FIXTURE, text: 'Fixture', img: fixture },
        { value: TOURNAMENT, text: 'Tournament', img: tournament },
        { value: MULTI_EVENT, text: 'Multi-Event', img: multiEvent },
        { value: BLOCK_FIXTURE, text: 'Block Fixture', img: blockFixture },
        { value: TRAINING, text: 'Training', img: training },
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

<style lang="sass" scoped>
.base
  height: 107px

.border
  border-radius: 4px
  box-shadow: 0 0 0 1px var(--v-info-lighten2)
  &.active
    box-shadow: 0 0 0 3px var(--v-brand-base)
  .label
    color: var(--v-info-darken2)
</style>

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
import bus from './bus.svg'
import venue from './venue.svg'
import other from './other.svg'

import { TransportType } from '@/enum'

export default {
  name: 'FxTransportToSelect',
  props: {
    value: {
      type: String,
      default: undefined,
    },

    items: {
      type: Array,
      default: () => [
        { value: TransportType.VENUE, text: 'Meet at Venue', img: venue },
        { value: TransportType.BUS, text: 'Bus', img: bus },
        { value: TransportType.OTHER, text: 'Other', img: other },
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

<template>
  <v-item-group
    :value="value"
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
import bus from './bus.svg'
import venue from './venue.svg'
import other from './other.svg'
import { TransportType } from '@/enum'

export default {
  name: 'FxTransportFromSelect',
  props: {
    value: {
      type: String,
      default: undefined,
    },

    items: {
      type: Array,
      default: () => [
        { value: TransportType.VENUE, text: 'Collect from Venue', img: venue },
        { value: TransportType.BUS, text: 'Bus', img: bus },
        { value: TransportType.OTHER, text: 'Other', img: other },
      ],
    },
  },
}
</script>

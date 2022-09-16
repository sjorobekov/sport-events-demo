<template>
  <v-select
    dense
    outlined
    hide-details
    multiple
    placeholder="Location"
    prepend-inner-icon="mdi-map-marker-outline"
    :items="values"
    chips
    :value="value"
    deletable-chips
    @input="$emit('input', $event)"
  />
</template>

<script>
import { EventLocation, EventLocationType } from '@/enum'

export default {
  name: 'FxCalendarLocationFilter',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    locations: [],
  }),
  computed: {
    values () {
      const items = Object.values(EventLocation).map((value) => {
        return {
          value,
          text: this.$t(`EVENT_LOCATION.${value}`),
        }
      })

      return [
        ...items,
        {
          value: EventLocationType.OPPONENT_CONFIRMS,
          text: this.$t(`EVENT_LOCATION_TYPE.${EventLocationType.OPPONENT_CONFIRMS}`),
        },
      ]
    },
  },
}
</script>

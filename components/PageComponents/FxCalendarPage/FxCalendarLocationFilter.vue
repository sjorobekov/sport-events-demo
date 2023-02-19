<template>
  <v-select
    dense
    outlined
    hide-details
    multiple
    placeholder="Location"
    prepend-inner-icon="$vuetify.icons.location-small"
    :items="values"
    chips
    :value="value"
    deletable-chips
    background-color="white"
    :class="{ 'location-filter': value.length > 0 }"
    @input="$emit('input', $event)"
  >
    <template #selection="{ index }">
      <v-chip v-show="index === 0">
        {{ value.length }} selected <v-icon size="18" @click.stop="$emit('input', [])">
          mdi-close-circle
        </v-icon>
      </v-chip>
    </template>
  </v-select>
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

<style scoped>
.location-filter /deep/ input {
  display: none;
}
</style>

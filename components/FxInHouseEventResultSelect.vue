<template>
  <v-autocomplete
    :id="id"
    v-async-validate
    :async-rules="asyncRules"
    outlined
    :value="value"
    :items="items"
    :height="height"
    :hide-details="hideDetails"
    placeholder="Select Status"
    @input="$emit('input', $event)"
  />
</template>

<script>
import { InHouseEventResult } from '@/enum'

export default {
  name: 'FxInHouseEventResultSelect',

  props: {
    value: {
      type: String,
      default: undefined,
    },
    asyncRules: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: undefined,
    },
    items: {
      type: Array,
      default () {
        return Object.values(InHouseEventResult).map((value) => {
          return {
            value,
            text: this.$t(`IN_HOUSE_EVENT_RESULT.${value}`),
          }
        })
      },
    },
    height: {
      type: [String, Number],
      default: 52,
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

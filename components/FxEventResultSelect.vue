<template>
  <v-autocomplete
    :id="id"
    v-async-validate
    :async-rules="asyncRules"
    outlined
    dense
    :value="value"
    :items="items"
    :hide-details="hideDetails"
    placeholder="Select Status"
    @input="$emit('input', $event)"
  />
</template>

<script>
import { EventResult } from '@/enum'

export default {
  name: 'FxEventStatusSelect',

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
        return Object.values(EventResult).map((value) => {
          return {
            value,
            text: this.$t(`EVENT_RESULT.${value}`),
          }
        })
      },
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

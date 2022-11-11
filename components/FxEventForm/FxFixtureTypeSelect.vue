<template>
  <v-select
    :id="id"
    v-async-validate
    outlined
    dense
    :value="value"
    :items="options"
    :async-rules="asyncRules"
    :placeholder="placeholder"
    @input="$emit('input', $event)"
  />
</template>

<script>
import { FixtureType } from '@/enum'

export default {
  name: 'FxFixtureTypeSelect',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Select Fixture Type',
    },
    asyncRules: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: undefined,
    },
  },

  computed: {
    options () {
      return [
        { text: 'Friendly', value: FixtureType.FRIENDLY },
        { text: 'On Tour', value: FixtureType.ON_TOUR },
        { text: 'Pre-Season', value: FixtureType.PRE_SEASON },
        { text: 'League', value: FixtureType.LEAGUE },
        { text: 'Cup', value: FixtureType.CUP },
      ]
    },
  },
}
</script>

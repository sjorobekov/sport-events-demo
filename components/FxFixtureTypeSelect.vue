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
import { FRIENDLY, ON_TOUR, CUP, LEAGUE, PRE_SEASON } from '@/enum/FixtureType'

export default {
  name: 'FxGenderSelect',
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
        { text: 'Friendly', value: FRIENDLY },
        { text: 'On Tour', value: ON_TOUR },
        { text: 'Pre-Season', value: PRE_SEASON },
        { text: 'League', value: LEAGUE },
        { text: 'Cup', value: CUP },
      ]
    },
  },
}
</script>

<template>
  <v-autocomplete
    :id="id"
    v-async-validate
    :async-rules="asyncRules"
    outlined
    dense
    :value="value"
    :items="locations"
    item-text="name"
    item-value="id"
    placeholder="Select Sports Location"
    @input="$emit('input', $event)"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FxSportLocationSelect',

  props: {
    id: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
    asyncRules: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters({
      locations: 'context/sportLocations',
    }),
  },
}
</script>

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
import { mapGetters } from 'vuex'

export default {
  name: 'FxGenderSelect',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Select Gender',
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
    ...mapGetters({
      options: 'api/teams/genderOptions',
    }),
  },
}
</script>

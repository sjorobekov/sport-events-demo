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
    :clearable="clearable"
    @input="$emit('input', $event)"
  >
    <template v-if="icon" #prepend-inner>
      <v-icon v-text="icon" />
    </template>
  </v-select>
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
    clearable: {
      type: Boolean,
      default: false,
    },
    icon: {
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

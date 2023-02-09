<template>
  <v-select
    :id="id"
    outlined
    dense
    :value="value"
    :items="options"
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
  name: 'FxYearGroupSelect',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Year Group',
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
      options: 'api/students/yearGroupOptions',
    }),
  },
}
</script>

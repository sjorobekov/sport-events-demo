<template>
  <v-autocomplete
    :id="id"
    outlined
    dense
    :value="value"
    :items="sports"
    item-text="name"
    item-value="id"
    :placeholder="placeholder"
    :clearable="clearable"
    @input="$emit('input', $event)"
  >
    <template v-if="icon" #prepend-inner>
      <v-icon v-text="icon" />
    </template>
  </v-autocomplete>
</template>

<script>

export default {
  name: 'FxSportAutocomplete',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Sport',
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
      default: 'mdi-whistle-outline',
    },
  },
  data: () => ({
    sports: [],
  }),

  async fetch () {
    this.sports = await this.$store.dispatch('api/sports/list')
  },
}
</script>

<template>
  <v-select
    dense
    outlined
    hide-details
    multiple
    placeholder="Age Groups"
    prepend-inner-icon="$vuetify.icons.teams"
    :items="items"
    chips
    :value="value"
    deletable-chips
    @input="$emit('input', $event)"
  />
</template>

<script>
export default {
  name: 'FxCalendarAgeFilter',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

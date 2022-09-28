<template>
  <v-select
    dense
    outlined
    hide-details
    multiple
    placeholder="Status"
    prepend-inner-icon="$vuetify.icons.status"
    :items="items"
    chips
    :value="value"
    deletable-chips
    @input="$emit('input', $event)"
  />
</template>

<script>
export default {
  name: 'FxCalendarStatusFilter',
  props: {
    items: {
      type: Array,
      default: () => [
        { value: 'PUBLISHED', text: 'Published' },
        { value: 'UNPUBLISHED', text: 'Unpublished' },
      ],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

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
    background-color="white"
    :class="{ 'status-filter': value.length > 0 }"
    @input="$emit('input', $event)"
  >
    <template #selection="{ index }">
      <v-chip v-show="index === 0">
        {{ value.length }} selected <v-icon size="18" @click.stop="$emit('input', [])">
          mdi-close-circle
        </v-icon>
      </v-chip>
    </template>
  </v-select>
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

<style scoped>
.status-filter /deep/ input {
  display: none;
}
</style>

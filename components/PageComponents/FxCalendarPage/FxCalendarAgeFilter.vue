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
    :class="{ 'event-filter': value.length > 0 }"
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

<style scoped>
.event-filter /deep/ input {
  display: none;
}
</style>

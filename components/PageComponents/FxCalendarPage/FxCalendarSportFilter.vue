<template>
  <v-select
    dense
    outlined
    hide-details
    multiple
    placeholder="Sport"
    prepend-inner-icon="$vuetify.icons.whistle"
    :items="items"
    item-text="name"
    item-value="id"
    background-color="white"
    chips
    :value="value"
    deletable-chips
    @input="$emit('input', $event)"
  >
    <template #item="{ item, on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-action class="mr-2">
          <v-checkbox :value="attrs.inputValue" />
        </v-list-item-action>
        <v-list-item-avatar size="24" class="mr-2">
          <v-img size="24" :src="item.icon" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
export default {
  name: 'FxCalendarSportFilter',
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

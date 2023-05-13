<template>
  <v-select
    dense
    outlined
    hide-details
    multiple
    placeholder="Event"
    prepend-inner-icon="$vuetify.icons.events-small"
    :items="values"
    chips
    :value="value"
    background-color="white"
    deletable-chips
    :class="{ 'staff-filter': value.length > 0 }"
    @input="$emit('input', $event)"
  >
    <template #selection="{ index }">
      <v-chip v-show="index === 0">
        {{ value.length }} selected <v-icon size="18" @click.stop="$emit('input', [])">
          mdi-close-circle
        </v-icon>
      </v-chip>
    </template>
    <template #item="{ item, on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-action class="mr-2">
          <v-checkbox :value="attrs.inputValue" />
        </v-list-item-action>
        <v-list-item-icon size="24" class="mr-2 align-self-center">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
import { EventType } from '@/enum'

export default {
  name: 'FxCalendarEventFilter',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    inHouseFilter: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    icons: {
      [EventType.TRAINING]: '$vuetify.icons.filter-training',
      [EventType.MULTI_EVENT]: '$vuetify.icons.filter-multi',
      [EventType.TOURNAMENT]: '$vuetify.icons.filter-tournament',
      [EventType.FIXTURE]: '$vuetify.icons.filter-fixture',
    },
  }),

  computed: {
    values () {
      return [
        ...this.items.filter(a => !!a).map((value) => {
          return {
            value,
            icon: this.icons[value],
            text: this.$t(`EVENT_TYPE.${value}`),
          }
        }),
        ...(this.inHouseFilter ? [{ value: 'InHouseEventMatch', icon: '$vuetify.icons.filter-in-house', text: 'In-House Sport' }] : []),
      ]
    },
  },
}
</script>

<style scoped>
.staff-filter /deep/ input {
  display: none;
}
</style>

<template>
  <v-select
    dense
    outlined
    hide-details
    multiple
    placeholder="Event"
    prepend-inner-icon="$vuetify.icons.staff"
    :items="values"
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
        <v-list-item-icon size="24" class="mr-2">
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
  },

  data: () => ({
    icons: {
      [EventType.TRAINING]: '$vuetify.icons.training',
      [EventType.MULTI_EVENT]: '$vuetify.icons.multievent',
      [EventType.TOURNAMENT]: '$vuetify.icons.tournament',
      [EventType.FIXTURE]: '$vuetify.icons.whistle',
    },
  }),

  computed: {
    values () {
      return this.items.map((value) => {
        return {
          value,
          icon: this.icons[value],
          text: this.$t(`EVENT_TYPE.${value}`),
        }
      })
    },
  },
}
</script>

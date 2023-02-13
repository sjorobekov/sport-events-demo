<template>
  <v-list-item class="px-0">
    <v-list-item-avatar class="mx-1">
      <v-icon v-text="icon" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="text-p2 font-weight-bold pl-2 pl-md-0" v-text="title" />
    </v-list-item-content>

    <slot name="action" />
  </v-list-item>
</template>

<script>
import { EventType } from '@/enum'

const iconEventTypeMap = {
  [EventType.MULTI_EVENT]: '$vuetify.icons.sports',
  [EventType.TOURNAMENT]: '$vuetify.icons.tournament',
  [EventType.TRAINING]: '$vuetify.icons.tactic',
}

export default {
  name: 'FxNonFixtureItem',
  props: {
    eventType: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: undefined,
    },
  },
  data: () => ({
    EventType,
  }),
  computed: {
    icon () {
      return iconEventTypeMap[this.eventType]
    },
    title () {
      if (this.eventType === EventType.TRAINING) {
        return 'Training'
      }

      return this.name
    },
  },
}
</script>

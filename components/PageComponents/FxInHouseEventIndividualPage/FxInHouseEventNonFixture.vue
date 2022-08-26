<template>
  <div class="text-center">
    <v-icon size="64" color="info darken-2" v-text="icon" />
    <div class="text-h5 info--text text--darken-2" v-text="title" />
  </div>
</template>

<script>
import { EventType } from '@/enum'

const iconEventTypeMap = {
  [EventType.MULTI_EVENT]: '$vuetify.icons.sports',
  [EventType.TOURNAMENT]: '$vuetify.icons.tournament',
  [EventType.TRAINING]: '$vuetify.icons.tactic',
}

export default {
  name: 'FxInHouseEventNonFixture',
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

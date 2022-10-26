<template>
  <component :is="component[value.kind]" :value="value" />
</template>

<script>
import EventItem from './EventItem'
import InHouseEventItem from './InHouseEventItem'

export default {
  name: 'FxCalendarEventMobile',

  components: {
    EventItem,
    InHouseEventItem,
  },

  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    component: {
      InHouseEventMatch: 'InHouseEventItem',
      Event: 'EventItem',
    },
  }),
}
</script>

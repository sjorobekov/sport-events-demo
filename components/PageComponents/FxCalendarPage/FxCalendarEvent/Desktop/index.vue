<template>
  <component :is="component[value.kind]" :value="value" />
</template>

<script>
import EventItem from './EventItem/EventItem'
import InHouseEventItem from './InHouseEventItem/InHouseEventItem'

export default {
  name: 'FxCalendarEventDesktop',

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

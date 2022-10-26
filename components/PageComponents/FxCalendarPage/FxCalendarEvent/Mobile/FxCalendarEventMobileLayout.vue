<template>
  <EventContainer :to="to" :sport="sport">
    <template #actions>
      <slot name="status" />
    </template>
    <template #subtitle>
      <slot name="subtitle" />
    </template>
    <v-row>
      <v-col>
        <v-list class="py-1">
          <slot name="default" />
        </v-list>
      </v-col>
    </v-row>
  </EventContainer>
</template>

<script>
import EventContainer from '../EventContainer'

export default {
  name: 'FxCalendarEventMobileLayout',
  components: {
    EventContainer,
  },
  props: {
    sport: {
      type: Object,
      required: true,
    },
    to: {
      type: Object,
      default: undefined,
    },
  },
}
</script>

<template>
  <div>
    <v-btn v-if="datePassed" outlined link :to="{ name: 'events-eventId', params: { eventId: event.id } }">
      Add Result
    </v-btn>

    <v-btn v-else-if="!me.sheet" outlined link :to="{ name: 'events-eventId-sheet', params: { eventId: event.id } }">
      Add Team
    </v-btn>
    <v-btn v-else outlined link :to="{ name: 'events-eventId-sheet', params: { eventId: event.id } }">
      Manage Team
    </v-btn>
  </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'NoResult',
  props: {
    me: {
      type: Object,
      required: true,
    },
    event: {
      type: Object,
      required: true,
    },
  },

  computed: {
    datePassed () {
      const today = DateTime.local().toFormat('yyyy-MM-dd')
      return today >= this.event.date
    },
  },
}
</script>

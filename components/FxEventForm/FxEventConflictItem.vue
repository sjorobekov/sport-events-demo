<template>
  <v-alert color="error lighten-5 pa-0">
    <v-list-item>
      <v-list-item-icon class="mr-2">
        <v-icon color="error darken-1">
          mdi-alert-circle-outline
        </v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="text-p1 font-weight-bold error--text darken-1">
          Event Conflict
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon class="mr-2">
        <v-icon color="error darken-1">
          $vuetify.icons.paper
        </v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ title }}</v-list-item-title>
        <v-list-item-subtitle>Event</v-list-item-subtitle>
      </v-list-item-content>
      <template v-if="item.lead">
        <v-list-item-icon class="mr-2">
          <v-icon color="error darken-1">
            $vuetify.icons.paper
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.lead.firstname }} {{ item.lead.lastname }}</v-list-item-title>
          <v-list-item-subtitle>Staff</v-list-item-subtitle>
        </v-list-item-content>
      </template>
      <template v-if="item.sportLocation">
        <v-list-item-icon class="mr-2">
          <v-icon color="error darken-1">
            mdi-map-marker
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.sportLocation.name }}</v-list-item-title>
          <v-list-item-subtitle>Location</v-list-item-subtitle>
        </v-list-item-content>
      </template>

      <v-list-item-content class="text-right">
        <label>Override Conflict?</label>
      </v-list-item-content>
      <v-list-item-action>
        <v-checkbox :value="item.eventId" :input-value="value" @change="$emit('input', $event)" />
      </v-list-item-action>
    </v-list-item>
  </v-alert>
</template>

<script>
import { EventType } from '@/enum'

export default {
  name: 'FxEventConflictItem',
  events: ['input'],
  props: {
    item: {
      type: Object,
      required: true,
    },
    value: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    title () {
      if (this.item.eventType === EventType.TRAINING) {
        return 'Training'
      }
      if (this.item.eventType === EventType.FIXTURE) {
        return 'Fixture'
      }

      return this.item.name
    },
  },
}
</script>

<template>
  <v-card color="error lighten-5" elevation="0" outlined>
    <div class="d-flex flex-column flex-md-row">
      <v-list-item>
        <v-list-item-icon class="mr-2">
          <v-icon color="error darken-1">
            mdi-alert-circle-outline
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-p1 font-weight-bold error--text darken-1">
            Conflict
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action class="hidden-md-and-up">
          <slot name="actions" />
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon class="mr-2">
          <v-icon color="error darken-1">
            $vuetify.icons.paper
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ title }}</v-list-item-title>
          <v-list-item-subtitle>Event</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <template v-if="item.lead">
        <v-list-item>
          <v-list-item-icon class="mr-2">
            <v-icon color="error darken-1">
              $vuetify.icons.paper
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.lead.firstname }} {{ item.lead.lastname }}</v-list-item-title>
            <v-list-item-subtitle>Staff</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list-item>
        <v-list-item-action>
          <v-checkbox
            :rules="[v => !!v || 'required']"
            class="v-input--reverse"
            label="Override Conflict?"
            required
          />
        </v-list-item-action>
      </v-list-item>
      <v-list-item class="hidden-sm-and-down">
        <v-list-item-content />
        <v-list-item-action>
          <v-btn rounded outlined @click="isOpen = !isOpen">
            {{ isOpen ? 'Hide' : 'View' }}
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </div>

    <FxEventConflictResolveForm
      v-if="isOpen"
      :context-school-id="contextSchoolId"
      :event-id="item.eventId"
      @updated="$emit('updated')"
    />
  </v-card>
</template>

<script>
import { EventType } from '@/enum'
import FxEventConflictResolveForm from '@/components/FxEventForm/FxEventConflictResolveForm'

export default {
  name: 'FxEventConflictItem',
  events: ['updated'],
  components: {
    FxEventConflictResolveForm,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    value: {
      type: Array,
      default: () => [],
    },
    contextSchoolId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    isOpen: false,
  }),

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

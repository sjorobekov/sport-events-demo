<template>
  <v-form ref="form" v-async-form :disabled="disabled" @submit.prevent="$emit('submit', value)">
    <component
      :is="form[eventType]"
      v-bind="$props"
      @input="$emit('input', $event)"
    />

    <v-list-item class="px-0">
      <v-spacer />
      <v-list-item-action>
        <div>
          <v-btn outlined class="mr-2" @click="$emit('cancel')">
            Cancel
          </v-btn>
          <v-btn depressed color="primary" type="submit">
            Confirm
          </v-btn>
        </div>
      </v-list-item-action>
    </v-list-item>
  </v-form>
</template>

<script>
import { EventType } from '@/enum'

export default {
  name: 'FxEventResultForm',
  props: {
    eventType: {
      type: String,
      default: undefined,
    },
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    leftName: {
      type: String,
      default: undefined,
    },
    rightName: {
      type: String,
      default: undefined,
    },
  },

  data: () => ({
    form: {
      [EventType.FIXTURE]: 'FxEventFixtureResultForm',
      [EventType.MULTI_EVENT]: 'FxEventMultiResultForm',
      [EventType.TOURNAMENT]: 'FxEventTournamentResultForm',
    },
  }),

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
  },
}
</script>

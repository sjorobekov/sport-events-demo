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
          <v-btn outlined class="neutral--text text--darken-3 mr-2" :ripple="false" @click="$emit('cancel')">
            Cancel
          </v-btn>
          <v-btn depressed color="primary" :ripple="false" type="submit">
            Confirm
          </v-btn>
        </div>
      </v-list-item-action>
    </v-list-item>
  </v-form>
</template>

<script>
import FxEventFixtureResultForm from './FxEventFixtureResultForm'
import FxEventMultiResultForm from './FxEventMultiResultForm'
import FxEventTournamentResultForm from './FxEventTournamentResultForm'
import { EventType } from '@/enum'

export default {
  name: 'FxEventResultForm',
  components: {
    FxEventFixtureResultForm,
    FxEventMultiResultForm,
    FxEventTournamentResultForm,
  },

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

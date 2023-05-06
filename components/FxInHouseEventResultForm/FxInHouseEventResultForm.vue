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
          <v-btn outlined class="neutral--text text--darken-3 mr-2" @click="$emit('cancel')">
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
import { InHouseEventType } from '@/enum'

export default {
  name: 'FxInHouseEventResultForm',
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
      [InHouseEventType.HOUSE_VS_HOUSE]: 'FxHouseVsHouseResultForm',
      [InHouseEventType.ALL_HOUSES]: 'FxAllHousesResultForm',
    },
  }),

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
  },
}
</script>

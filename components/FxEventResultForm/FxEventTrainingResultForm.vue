<template>
  <v-row>
    <v-col cols="12">
      <label class="text-p1">Result</label>
      <FxEventResultSelect
        :async-rules="[$rule.required]"
        height="52"
        hide-details
        :items="resultOptions"
        :value="formData.overallResult"
        @input="update('overallResult', $event)"
      />
    </v-col>
  </v-row>
</template>

<script>
import { EventResult } from '@/enum'
const INCLUDE_OPTIONS = [EventResult.TO_BE_PLAYED, EventResult.POSTPONED, EventResult.CANCELLED]

export default {
  name: 'FxEventTrainingResultForm',

  props: {
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    EventResult,
  }),

  computed: {
    formData () {
      return {
        ...(this.value || {}),
      }
    },
    resultOptions () {
      return Object.values(EventResult)
        .filter(value => INCLUDE_OPTIONS.includes(value))
        .map(value => ({ value, text: this.$t(`EVENT_RESULT.${value}`) }))
    },
  },

  methods: {
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },
  },
}
</script>

<template>
  <v-form ref="form" v-async-form :disabled="disabled" @submit.prevent="$emit('submit', formData)">
    <v-row>
      <v-col cols="12">
        <label class="text-p1">Overall Result</label>
        <FxEventResultSelect height="52" hide-details :value="formData.result" @input="update('result', $event)" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <label>Notes</label>
        <v-textarea outlined placeholder="Tournament Notes" />
      </v-col>
    </v-row>

    <v-list-item class="px-0">
      <v-spacer />
      <v-list-item-action>
        <div>
          <v-btn outlined class="mr-2">
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
import { EventResult } from '@/enum'

export default {
  name: 'FxEventFixtureResultForm',
  props: {
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
    EventResult,
  }),

  computed: {
    formData () {
      return {
        score: 0,
        opponentScore: 0,
        ...(this.value || {}),
      }
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },

    increaseScore () {
      this.$emit('input', { ...this.formData, score: (this.formData.score + 1) })
    },

    increaseOpponentScore () {
      this.$emit('input', { ...this.formData, opponentScore: (this.formData.opponentScore + 1) })
    },
  },
}
</script>

<style scoped>
/deep/ .centered-input input {
  text-align: center;
}
</style>

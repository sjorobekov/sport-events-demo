<template>
  <v-form ref="form" v-async-form :disabled="disabled" @submit.prevent="$emit('submit', formData)">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <label class="text-p1">Result</label>
        <FxEventResultSelect height="52" hide-details :value="formData.overallResult" @input="update('overallResult', $event)" />
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <label class="text-p1">&nbsp;</label>
        <FxResultRadio :value="formData.results[0].result" @input="update('results[0].result', $event)" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <label>{{ leftName }}</label>
        <v-text-field
          height="52"
          class="centered-input mb-2"
          hide-details
          outlined
          dense
          placeholder="0"
          :value="formData.results[0].score"
          @input="update('score', $event)"
        />
        <v-btn height="52" block depressed @click="increaseScore">
          +1
        </v-btn>
      </v-col>

      <v-col>
        <label>{{ rightName }}</label>
        <v-text-field
          height="52"
          class="centered-input mb-2"
          hide-details
          outlined
          dense
          placeholder="0"
          :value="formData.results[0].opponentScore"
          @input="update('opponentScore', $event)"
        />
        <v-btn height="52" block depressed @click="increaseOpponentScore">
          +1
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <label>Notes</label>
        <v-textarea outlined placeholder="Match Notes" :value="formData.matchNotes" @input="update('matchNotes', $event)" />
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
import merge from 'lodash/merge'
import tap from 'lodash/tap'
import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'
import { EventResult } from '@/enum'
import FxResultRadio from '@/components/FxEventResultForm/FxResultRadio'

export default {
  name: 'FxEventFixtureResultForm',
  components: { FxResultRadio },
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
      return merge({
        overallResult: '',
        results: [
          {
            score: 0,
            opponentScore: 0,
          },
        ],
      }, this.value || {})
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    update (key, value) {
      this.$emit('input', tap(cloneDeep(this.formData), v => set(v, key, value)))
    },

    increaseScore () {
      this.update('results[0].score', this.formData.results[0]?.score + 1)
    },

    increaseOpponentScore () {
      this.update('results[0].opponentScore', this.formData.results[0]?.opponentScore + 1)
    },
  },
}
</script>

<style scoped>
/deep/ .centered-input input {
  text-align: center;
}
</style>

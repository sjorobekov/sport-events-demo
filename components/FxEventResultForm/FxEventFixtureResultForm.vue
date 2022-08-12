<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <label class="text-p1">Result</label>
        <FxEventResultSelect
          height="52"
          hide-details
          :value="formData.overallResult"
          :async-rules="[$rule.required]"
          :items="resultOptions"
          @input="update('overallResult', $event)"
        />
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <label class="text-p1">&nbsp;</label>
        <FxResultRadio :value="formData.results[0].result" @input="update('overallResult', $event)" />
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
          @input="update('results[0].score', $event)"
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
          @input="update('results[0].opponentScore', $event)"
        />
        <v-btn height="52" block depressed @click="increaseOpponentScore">
          +1
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <label>Notes</label>
        <v-textarea outlined placeholder="Match Notes" :value="formData.resultNotes" @input="update('resultNotes', $event)" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import tap from 'lodash/tap'
import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'
import { EventResult } from '@/enum'
import FxResultRadio from '@/components/FxEventResultForm/components/FxResultRadio'
const EXCLUDE_OPTIONS = [EventResult['1ST'], EventResult['2ND'], EventResult['3RD'], EventResult['4TH']]

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
      return {
        ...this.value,
        results: this.value.results || [
          {
            score: 0,
            opponentScore: 0,
          },
        ],
      }
    },
    resultOptions () {
      return Object.values(EventResult)
        .filter(value => !EXCLUDE_OPTIONS.includes(value))
        .map(value => ({ value, text: this.$t(`EVENT_RESULT.${value}`) }))
    },
  },

  methods: {
    update (key, value) {
      const data = cloneDeep(this.formData)
      if (key === 'overallResult') {
        data.results[0].result = value
      }
      this.$emit('input', tap(data, v => set(v, key, value)))
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

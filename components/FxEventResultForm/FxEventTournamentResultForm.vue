<template>
  <div>
    <v-row>
      <v-col cols="12">
        <label class="text-p1">Overall Result</label>
        <FxEventResultSelect height="52" hide-details :value="formData.overallResult" @input="update('overallResult', $event)" />
      </v-col>
    </v-row>

    <FxEventTournamentItem
      v-for="(item, i) in formData.results"
      :key="i"
      :value="item"
      :left-name="leftName"
      @input="update(`results[${i}]`, $event)"
    />

    <v-btn text block @click="add()">
      Add Another Match
    </v-btn>
    <v-row>
      <v-col>
        <label>Notes</label>
        <v-textarea outlined placeholder="Tournament Notes" :value="formData.resultNotes" @input="update('resultNotes', $event)" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import tap from 'lodash/tap'
import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'
import FxEventTournamentItem from '@/components/FxEventResultForm/components/FxEventTournamentItem'
import { EventResult } from '@/enum'

export default {
  name: 'FxEventFixtureResultForm',
  components: { FxEventTournamentItem },
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
  },

  methods: {
    update (key, value) {
      this.$emit('input', tap(cloneDeep(this.formData), v => set(v, key, value)))
    },

    increaseScore () {
      this.update('results[0].score', this.formData.results[0]?.score + 1)
    },

    increaseOpponentScore () {
      this.update('results[0].opponentScore', this.formData.results[0]?.opponentScore + 1)
    },

    add () {
      this.$emit('input', tap(cloneDeep(this.formData), v => v.results.push({
        score: 0,
        opponentScore: 0,
      })))
    },
  },
}
</script>

<style scoped>
/deep/ .centered-input input {
  text-align: center;
}
</style>

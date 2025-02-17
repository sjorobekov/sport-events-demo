<template>
  <div>
    <v-row>
      <v-col cols="12">
        <label class="text-p1">Overall Result</label>
        <FxEventResultSelect
          height="52"
          hide-details
          :value="formData.overallResult"
          :async-rules="[$rule.required]"
          @input="update('overallResult', $event)"
        />
      </v-col>
    </v-row>

    <div v-for="(item, i) in formData.results" :key="i">
      <div class="d-flex mt-6">
        <div class="text-p1 neutral--text text--darken-2 pr-3 line-height">
          {{ matchLabel(i) }}
        </div>
        <v-divider class="my-4" />
      </div>

      <FxEventTournamentItem
        :value="item"
        :left-name="leftName"
        @input="update(`results[${i}]`, $event)"
      />
    </div>

    <v-divider class="my-4" />

    <v-btn
      text
      block
      color="neutral darken-3"
      class="add-another-match-button"
      @click="add()"
    >
      <v-icon>
        $vuetify.icons.add-all
      </v-icon> Add Another Match
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
    units: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'],
  }),

  computed: {
    formData () {
      return {
        ...this.value,
        results: this.value.results || [
          {
            score: '0',
            opponentScore: '0',
          },
        ],
      }
    },

    matchLabel () {
      return (i) => {
        if (i > 10) {
          return `Match ${i}`
        }

        return `Match ${this.units[i]}`
      }
    },
  },

  methods: {
    update (key, value) {
      this.$emit('input', tap(cloneDeep(this.formData), v => set(v, key, value)))
    },

    add () {
      this.$emit('input', tap(cloneDeep(this.formData), v => v.results.push({
        score: '0',
        opponentScore: '0',
      })))
    },
  },
}
</script>

<style scoped>
/deep/ .centered-input input {
  text-align: center;
}
.line-height {
  line-height: 31px;
}
.v-btn:before {
  opacity: 0!important
}

.add-another-match-button:hover {
  box-shadow: none!important;
  color: var(--v-primary-base)!important;
}
</style>

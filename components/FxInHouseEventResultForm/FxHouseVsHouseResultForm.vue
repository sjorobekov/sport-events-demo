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
        <FxResultRadio :value="formData.overallResult" @input="update('overallResult', $event)" />
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
          :value="formData.homeScore"
          @input="update('homeScore', $event)"
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
          :value="formData.awayScore"
          @input="update('awayScore', $event)"
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
import { InHouseEventResult } from '@/enum'
import FxResultRadio from '@/components/FxInHouseEventResultForm/components/FxResultRadio'

export default {
  name: 'FxHouseVsHouseResultForm',
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
    InHouseEventResult,
  }),

  computed: {
    formData () {
      return {
        ...this.value,
        homeScore: this.value.homeScore || '0',
        awayScore: this.value.awayScore || '0',
      }
    },
    resultOptions () {
      return Object.values(InHouseEventResult)
        .map(value => ({ value, text: this.$t(`IN_HOUSE_EVENT_RESULT.${value}`) }))
    },
  },

  methods: {
    update (key, value) {
      const data = cloneDeep(this.formData)
      if (key === 'overallResult') {
        data.overallResult = value
      }
      this.$emit('input', tap(data, v => set(v, key, value)))
    },

    increaseScore () {
      const incremented = parseFloat(this.formData.homeScore) + 1
      this.update('homeScore', incremented.toString())
    },

    increaseOpponentScore () {
      const incremented = parseFloat(this.formData.awayScore) + 1
      this.update('awayScore', incremented.toString())
    },
  },
}
</script>

<style scoped>
/deep/ .centered-input input {
  text-align: center;
}
</style>

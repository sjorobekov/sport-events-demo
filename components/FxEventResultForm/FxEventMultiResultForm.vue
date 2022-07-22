<template>
  <v-form ref="form" v-async-form :disabled="disabled" @submit.prevent="$emit('submit', formData)">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <label class="text-p1">Result</label>
        <FxEventResultSelect height="52" hide-details :value="formData.result" @input="update('result', $event)" />
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <label class="text-p1">&nbsp;</label>
        <v-radio-group class="mt-0 pt-0" hide-details :value="formData.result" @change="update('result', $event)">
          <v-row>
            <v-col cols="4">
              <v-radio on-icon="mdi-check-circle" color="success" class="radio rounded-l rounded-r px-2" :value="EventResult.WIN" label="Win" />
            </v-col>
            <v-col cols="4">
              <v-radio on-icon="mdi-check-circle" color="success" class="radio rounded-l rounded-r py-4 px-2" :value="EventResult.DRAW" label="Draw" />
            </v-col>
            <v-col cols="4">
              <v-radio on-icon="mdi-check-circle" color="success" class="radio rounded-l rounded-r py-4 px-2" :value="EventResult.LOST" label="Loss" />
            </v-col>
          </v-row>
        </v-radio-group>
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
          :value="formData.score"
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
          :value="formData.opponentScore"
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
        <v-textarea outlined placeholder="Match Notes" />
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
  name: 'FxEventResultForm',

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
.radio {
  height: 52px;
  box-shadow: 0 0 0 1px var(--v-info-lighten2);
}

.radio.v-item--active {
  box-shadow: 0 0 0 1px var(--v-success-base);
}

/deep/ .centered-input input {
  text-align: center;
}
</style>

<template>
  <div>
    <v-row>
      <v-col>
        <label>Opponent</label>
        <FxOpponentSelect
          :async-rules="[$rule.required]"
          :school-id="contextSchoolId"
          :opponent-id="formData.opponentId"
          :opponent-school-id="formData.opponentSchoolId"
          @update:opponentId="updateOpponent('opponentId', $event)"
          @update:opponentSchoolId="updateOpponent('opponentSchoolId', $event)"
        />
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
        <v-btn height="52" class="neutral--text text--darken-3 disable-dbl-tap-zoom"  block depressed @click="increaseScore">
          +1
        </v-btn>
      </v-col>

      <v-col>
        <label>{{ opponentSchool ? opponentSchool.name : '&nbsp;' }}</label>
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
        <v-btn height="52" class="neutral--text text--darken-3 disable-dbl-tap-zoom"  block depressed @click="increaseOpponentScore">
          +1
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <label>Round</label>
        <v-text-field
          height="52"
          class="centered-input mb-2"
          hide-details
          outlined
          dense
          placeholder="Enter Round"
          :value="formData.round"
          @input="update('round', $event)"
        />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <label class="text-p1">&nbsp;</label>
        <FxResultRadio :value="formData.result" @input="update('result', $event)" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventResult } from '@/enum'
import FxResultRadio from '@/components/FxEventResultForm/components/FxResultRadio'
import FxOpponentSelect from '@/components/FxEventForm/FxOpponentSelect'

export default {
  name: 'FxEventTournamentItem',
  components: { FxOpponentSelect, FxResultRadio },
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
  },

  data: () => ({
    EventResult,
    opponentSchool: null,
  }),

  async fetch () {
    if (this.formData.opponentSchoolId) {
      await this.fetchOpponentSchool(this.formData.opponentSchoolId)
    }
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
    formData () {
      return {
        score: 0,
        opponentScore: 0,
        opponentSchoolId: null,
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

    updateOpponent (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
      if (key === 'opponentSchoolId') {
        this.fetchOpponentSchool(value)
      }
    },

    async fetchOpponentSchool (id) {
      this.opponentSchool = await this.$store.dispatch('api/schools/fetch', id)
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

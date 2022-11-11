<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <v-row>
      <v-col>
        <label for="team">Team</label>
        <v-autocomplete
          id="team"
          outlined
          dense
          :value="formData.teamId"
          :items="teams"
          item-text="name"
          item-value="id"
          placeholder="Select Team"
          @input="update('teamId', $event)"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" sm="6" md="4">
        <label for="meetTime">Meet Time</label>
        <FxTimePickerMenu
          id="meetTime"
          :value="formData.meetTime"
          @input="update('meetTime', $event)"
        />
      </v-col>
      <v-col cols="6" sm="6" md="4">
        <label for="returnTime">Return Time</label>
        <FxTimePickerMenu
          id="returnTime"
          :value="formData.returnTime"
          @input="update('returnTime', $event)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <label for="transportTo">Transport To</label>
        <v-select
          id="transportTo"
          dense
          outlined
          :value="formData.transportTo"
          placeholder="Transport To"
          :items="transportToOptions"
          @input="update('transportTo', $event)"
        />
      </v-col>
      <v-col v-if="formData.transportTo === TransportType.OTHER">
        <label for="transportToOther">Transport Notes</label>
        <v-text-field
          id="transportToOther"
          v-async-validate
          :async-rules="[$rule.required]"
          dense
          outlined
          :value="formData.transportToOther"
          placeholder="Transport Notes"
          @input="update('transportToOther', $event)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <label for="transportFrom">Transport From</label>
        <v-select
          id="transportFrom"
          dense
          outlined
          :value="formData.transportFrom"
          placeholder="Transport From"
          :items="transportFromOptions"
          @input="update('transportFrom', $event)"
        />
      </v-col>
      <v-col v-if="formData.transportFrom === TransportType.OTHER">
        <label for="transportFromOther">Transport Notes</label>
        <v-text-field
          id="transportFromOther"
          v-async-validate
          :async-rules="[$rule.required]"
          dense
          outlined
          :value="formData.transportFromOther"
          placeholder="Transport Notes"
          @input="update('transportFromOther', $event)"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <label for="info">Further Information</label>
        <v-textarea
          id="info"
          dense
          outlined
          :value="formData.info"
          @input="update('info', $event)"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <label for="result">Result</label>

        <FxEventResultSelect
          id="result"
          height="52"
          :value="formData.overallResult"
          :async-rules="[$rule.required]"
          @input="update('overallResult', $event)"
        />
      </v-col>
    </v-row>

    <v-row v-if="[EventResult.SEE_MATCH_NOTES, EventResult.SEE_EVENT_RESULTS].includes(formData.overallResult)">
      <v-col>
        <label for="resultNotes">Result Notes</label>
        <v-textarea
          id="resultNotes"
          dense
          outlined
          :value="formData.resultNotes"
          @input="update('resultNotes', $event)"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { TransportType, EventResult } from '@/enum'

export default {
  name: 'FxEventParticipantForm',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    value: {
      type: Object,
      default: () => {},
    },

    teams: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    TransportType,
    EventResult,
  }),

  computed: {
    formData () {
      return {
        ...(this.value || {}),
      }
    },

    transportToOptions () {
      return Object.values(TransportType).map((type) => {
        return { value: type, text: this.$t(`TRANSPORT_TO.${type}`) }
      })
    },

    transportFromOptions () {
      return Object.values(TransportType).map((type) => {
        return { value: type, text: this.$t(`TRANSPORT_FROM.${type}`) }
      })
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },
  },
}
</script>

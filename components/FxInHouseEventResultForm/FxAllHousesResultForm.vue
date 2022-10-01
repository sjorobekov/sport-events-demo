<template>
  <div>
    <v-row>
      <v-col cols="12">
        <label class="text-p1">Result</label>
        <FxInHouseEventResultSelect
          :async-rules="[$rule.required]"
          height="52"
          hide-details
          :value="formData.overallResult"
          :items="resultOptions"
          @input="update('overallResult', $event)"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <label>Notes</label>
        <client-only>
          <FxTipTapEditor :value="formData.resultNotes" @input="update('resultNotes', $event)" />
        </client-only>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { InHouseEventResult } from '~/enum'

export default {
  name: 'FxAllHousesResultForm',

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

  computed: {
    ...mapGetters({
      teams: 'page/inHouseEvent/teams',
    }),
    formData () {
      return {
        ...(this.value || {}),
        overallResult: this.value.winnerId || this.value.overallResult,
      }
    },
    resultOptions () {
      const teamResults = this.teams.map((team) => {
        return { value: team.id, text: `${team.name} won` }
      })
      const results = Object.values(InHouseEventResult)
        .filter(value => ![InHouseEventResult.HOME, InHouseEventResult.AWAY].includes(value))
        .map((value) => {
          return { value, text: this.$t(`IN_HOUSE_EVENT_RESULT.${value}`) }
        })
      return teamResults.concat(results)
    },
  },

  methods: {
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },
  },
}
</script>

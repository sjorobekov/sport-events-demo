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
    formData () {
      return {
        ...(this.value || {}),
      }
    },
  },

  methods: {
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },
  },
}
</script>

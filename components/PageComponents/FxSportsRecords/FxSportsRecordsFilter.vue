<template>
  <div class="d-flex gap flex-column flex-sm-row">
    <v-autocomplete
      outlined
      dense
      :items="sports"
      item-text="name"
      item-value="id"
      prepend-inner-icon="mdi-whistle-outline"
      placeholder="Sport"
      :value="formData.sportId"
      hide-details
      clearable
      @input="update('sportId', $event)"
    />

    <v-autocomplete
      outlined
      dense
      :items="events"
      item-text="name"
      item-value="id"
      prepend-inner-icon="mdi-clipboard-outline"
      placeholder="Events"
      :value="formData.sportsRecordEventId"
      hide-details
      clearable
      @input="update('sportsRecordEventId', $event)"
    />

    <FxRecordCategorySelect :value="formData.sportsRecordCategoryId" clearable @input="update('sportsRecordCategoryId', $event)" />

    <v-menu ref="menu" offset-y :close-on-content-click="false">
      <template #activator="{ on, attrs }">
        <v-text-field
          id="date"
          :value="formattedDate"
          readonly
          outlined
          dense
          clearable
          v-bind="attrs"
          placeholder="Date"
          prepend-inner-icon="mdi-clock-outline"
          background-color="white"
          hide-details
          v-on="on"
        />
      </template>
      <v-date-picker
        ref="picker"
        :value="formData.date"
        @input="update('date', $event)"
      />
    </v-menu>
  </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'FxSportsRecordsFilter',
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    events: {
      type: Array,
      default: () => [],
    },
    sports: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    formData () {
      return {
        ...(this.value || {}),
      }
    },

    formattedDate () {
      return this.formData.date ? DateTime.fromISO(this.formData.date).toFormat('dd-MM-yyyy') : ''
    },

  },

  methods: {
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },
  },
}
</script>

<style scoped>
  .gap {
    gap: 8px;
  }
</style>

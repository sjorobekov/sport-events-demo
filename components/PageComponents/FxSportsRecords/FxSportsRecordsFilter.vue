<template>
  <div class="d-flex gap flex-column flex-sm-row">
    <v-autocomplete
      outlined
      dense
      :items="sports"
      item-text="name"
      item-value="id"
      prepend-inner-icon="$vuetify.icons.sports-small"
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
      prepend-inner-icon="$vuetify.icons.events-small"
      placeholder="Events"
      :value="formData.sportsRecordEventId"
      hide-details
      clearable
      @input="update('sportsRecordEventId', $event)"
    />

    <FxRecordCategorySelect :value="formData.sportsRecordCategoryId" clearable @input="update('sportsRecordCategoryId', $event)" />
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

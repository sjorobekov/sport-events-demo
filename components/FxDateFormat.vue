<template>
  <span v-if="date">{{ DateTime.fromFormat(date, inputFormat).toFormat(outputFormat) }}</span>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'FxDateFormat',
  props: {
    date: {
      type: String,
      required: true,
    },
    inputFormat: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    outputFormat: {
      type: String,
      default: () => 'd MMM yyyy',
    },
  },
  data: () => ({
    DateTime,
  }),
}
</script>

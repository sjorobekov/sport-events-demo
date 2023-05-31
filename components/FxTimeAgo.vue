<template>
  <span class="neutral--text text--darken-3">{{ timeAgo }}</span>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'FxTimeAgo',
  props: {
    value: {
      type: String,
      default: () => '',
    },
  },

  computed: {
    timeAgo () {
      return DateTime.fromISO(this.value).toRelative()
    },
  },
}
</script>

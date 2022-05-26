<template>
  <span>{{ age }}</span>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'FxAge',
  props: {
    birthday: {
      type: String,
      default: () => '',
    },
  },

  computed: {
    age () {
      if (!this.birthday) {
        return ''
      }
      return -parseInt(DateTime.fromFormat(this.birthday, 'yyyy-MM-dd').diffNow('years').years)
    },
  },
}
</script>

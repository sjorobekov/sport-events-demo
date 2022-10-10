<template>
  <FxPill>
    {{ formattedPill }}
  </FxPill>
</template>

<script>
import { DateTime } from 'luxon'
import FxPill from '@/components/FxPill/FxPill'

export default {
  name: 'FxCalendarPill',
  components: { FxPill },
  props: {
    value: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    formattedPill () {
      if (!this.value) {
        return ''
      }
      return DateTime.fromFormat(this.value, 'yyyy-MM-dd').toFormat('dd-MM-yyyy')
    },
  },
}
</script>

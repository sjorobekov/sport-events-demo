<template>
  <span>{{ name }}</span>
</template>

<script>
import { MALE } from '@/enum/Gender'

export default {
  name: 'FxGender',
  props: {
    value: {
      type: String,
      default: () => '',
    },
  },

  computed: {
    name () {
      if (!this.value) {
        return ''
      }

      return this.value === MALE ? 'Male' : 'Female'
    },
  },
}
</script>

<template>
  <span>{{ name }}</span>
</template>

<script>
import { Gender } from '@/enum'

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

      return this.value === Gender.MALE ? 'Male' : 'Female'
    },
  },
}
</script>

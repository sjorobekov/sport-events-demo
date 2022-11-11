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

      if (this.value === Gender.MALE) {
        return 'Male'
      } else if (this.value === Gender.FEMALE) {
        return 'Female'
      } else {
        return 'Mixed'
      }
    },
  },
}
</script>

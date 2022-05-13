<template>
  <span>{{ name }}</span>
</template>

<script>
import { getName } from 'country-list'

export default {
  name: 'FxCountryName',
  props: {
    code: {
      type: String,
      default: undefined,
    },
  },

  computed: {
    name () {
      return this.code ? getName(this.code) : ''
    },
  },
}
</script>

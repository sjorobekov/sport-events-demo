<template>
  <span>{{ name(code) }}</span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FxCountryName',
  props: {
    code: {
      type: String,
      default: undefined,
    },
  },

  computed: {
    ...mapGetters({
      name: 'countries/name',
    }),
  },
}
</script>

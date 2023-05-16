<template>
  <span class="neutral--text text--darken-4">{{ location }}</span>
</template>

<script>
import { InHouseEventLocationType } from '@/enum'

export default {
  name: 'FxInHouseLocationLabel',

  props: {
    match: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    sportLocation: {},
  }),

  computed: {
    location () {
      if (this.match.location === InHouseEventLocationType.OTHER) {
        return this.match.otherLocation
      }
      return this.sportLocation?.name || ''
    },
  },

  async created () {
    if (this.match.sportLocationId && !this.match.sportLocation) {
      this.sportLocation = await this.$store.dispatch('api/locations/fetch', this.match.sportLocationId)
    } else {
      this.sportLocation = this.match.sportLocation
    }
  },
}
</script>

<template>
  <span>{{ location }}</span>
</template>

<script>
import { EventLocation } from '@/enum'

const locationLabel = {
  [EventLocation.HOME]: 'Home',
  [EventLocation.NEUTRAL]: 'Neutral',
  [EventLocation.AWAY]: 'Away',
}
export default {
  name: 'FxSportLocationLabel',
  props: {
    sportLocation: {
      type: Object,
      default: null,
    },
    sportLocationId: {
      type: String,
      default: null,
    },
    eventLocationType: {
      type: String,
      required: true,
    },
    eventLocationOther: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    fetchedSportLocation: {},
  }),

  computed: {
    location () {
      const location = []

      if (this.eventLocationType) {
        location.push(locationLabel[this.eventLocationType])
      }

      if (this.fetchedSportLocation) {
        location.push(this.fetchedSportLocation.name)
      } else if (this.eventLocationOther) {
        location.push(this.eventLocationOther)
      }

      return location.join(' - ')
    },
  },

  async created () {
    if (this.sportLocation) {
      this.fetchedSportLocation = this.sportLocation
    } else if (this.sportLocationId) {
      this.fetchedSportLocation = await this.$store.dispatch('api/locations/fetch', this.sportLocationId)
    }
  },
}
</script>

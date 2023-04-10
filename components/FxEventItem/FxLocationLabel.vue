<template>
  <span class="neutral--text text--darken-4">{{ location }}</span>
</template>

<script>
import { EventLocation, EventLocationType } from '@/enum'

const locationLabel = {
  [EventLocation.HOME]: 'Home',
  [EventLocation.NEUTRAL]: 'Neutral',
  [EventLocation.AWAY]: 'Away',
}

export default {
  name: 'FxLocationLabel',

  props: {
    event: {
      type: Object,
      default: () => {},
    },
    me: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    sportLocation: {},
  }),

  computed: {
    location () {
      const location = []
      if (this.me.eventLocation) {
        location.push(locationLabel[this.me.eventLocation])
      }

      if (this.event.location === EventLocationType.SPORTS_LOCATIONS && this.sportLocation.name) {
        location.push(this.sportLocation.name)
      } else if (this.event.location === EventLocationType.OTHER) {
        location.push(this.event.otherLocation)
      } else if (this.event.location === EventLocationType.OPPONENT_CONFIRMS) {
        location.push('Opponent Confirms')
      }

      return location.join(' - ')
    },
  },

  async created () {
    if (this.event.sportLocationId && !this.event.sportLocation) {
      this.sportLocation = await this.$store.dispatch('api/locations/fetch', this.event.sportLocationId)
    } else {
      this.sportLocation = this.event.sportLocation
    }
  },
}
</script>

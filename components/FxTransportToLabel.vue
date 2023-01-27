<template>
  <span>{{ label }}</span>
</template>

<script>
import { TransportType } from '~/enum'

export default {
  name: 'FxTransportToLabel',

  props: {
    transportTo: {
      type: String,
      required: true,
    },
    transportToOther: {
      type: String,
      default: '',
    },
  },

  computed: {
    label () {
      if (this.transportTo === TransportType.OTHER) {
        return this.transportToOther
      }

      if (this.transportTo) {
        return this.$t(`TRANSPORT_TO.${this.transportTo}`)
      }

      return ''
    },
  },
}
</script>

<style scoped>

</style>

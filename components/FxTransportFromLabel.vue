<template>
  <span>{{ label }}</span>
</template>

<script>
import { TransportType } from '~/enum'

export default {
  name: 'FxTransportFromLabel',

  props: {
    transportFrom: {
      type: String,
      required: true,
    },
    transportFromOther: {
      type: String,
      default: '',
    },
  },

  computed: {
    label () {
      if (this.transportFrom === TransportType.OTHER) {
        return this.transportFromOther
      }

      if (this.transportFrom) {
        return this.$t(`TRANSPORT_TO.${this.transportFrom}`)
      }

      return ''
    },
  },
}
</script>

<style scoped>

</style>

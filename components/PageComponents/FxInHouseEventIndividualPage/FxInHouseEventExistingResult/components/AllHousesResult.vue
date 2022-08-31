<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="px-3" v-html="notes" />
</template>

<script>
import { mapGetters } from 'vuex'
import xss from 'xss'

export default {
  name: 'AllHousesResult',
  computed: {
    ...mapGetters({
      result: 'page/inHouseEvent/result',
    }),
    notes () {
      return xss(this.result.resultNotes)
    },
  },
}
</script>

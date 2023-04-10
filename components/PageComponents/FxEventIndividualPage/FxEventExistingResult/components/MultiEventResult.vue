<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="px-3 py-3 text-p2 neutral--text text--darken-3" v-html="notes" />
</template>

<script>
import { mapGetters } from 'vuex'
import xss from 'xss'

export default {
  name: 'FixtureResult',
  computed: {
    ...mapGetters({
      result: 'page/event/result',
    }),
    notes () {
      return xss(this.result.resultNotes)
    },
  },
}
</script>

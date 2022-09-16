<template>
  <div class="result">
    {{ overallResult }}
  </div>
</template>

<script>
export default {
  name: 'TournamentResult',
  props: {
    me: {
      type: Object,
      required: true,
    },
  },
  computed: {
    overallResult () {
      return this.$t(`EVENT_RESULT.${this.me.overallResult}`)
    },
  },
}
</script>

<style scoped>
.result {
  height: 40px;
  line-height: 40px;
  background: var(--v-info-lighten4)
}
</style>

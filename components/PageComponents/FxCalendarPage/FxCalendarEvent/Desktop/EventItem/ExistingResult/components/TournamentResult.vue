<template>
  <div class="result text-no-wrap px-2">
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

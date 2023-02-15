<template>
  <div v-if="!hasResults">
    <v-avatar rounded height="40" width="60" color="info lighten-4">
      ―
    </v-avatar>
  </div>
  <div v-else class="result text-no-wrap px-2 rounded">
    {{ overallResult }}
  </div>
</template>

<script>
export default {
  name: 'MultiEventResult',
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
    hasResults () {
      return !!this.me.results
    },
  },
}
</script>

<style scoped>
.result {
  height: 40px;
  line-height: 40px;
  background: var(--v-info-lighten4);
  text-align: center;
  min-width: 60px;
}
</style>

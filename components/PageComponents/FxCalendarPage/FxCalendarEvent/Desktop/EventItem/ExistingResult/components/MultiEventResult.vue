<template>
  <div v-if="!hasResults" style="width: 150px">
    <v-avatar rounded height="40" width="60" class="mr-2" color="info lighten-4">
      ―
    </v-avatar>
  </div>
  <div v-else class="result text-no-wrap px-2">
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
  background: var(--v-info-lighten4)
}
</style>

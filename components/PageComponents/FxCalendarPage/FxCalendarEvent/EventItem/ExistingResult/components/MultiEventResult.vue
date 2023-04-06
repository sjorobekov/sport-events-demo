<template>
  <div v-if="!hasResults">
    <v-avatar rounded height="40" width="60" color="neutral lighten-2">
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
  background: var(--v-neutral-lighten2);
  text-align: center;
  min-width: 60px;
  color: var(--v-neutral-darken4);
}
</style>

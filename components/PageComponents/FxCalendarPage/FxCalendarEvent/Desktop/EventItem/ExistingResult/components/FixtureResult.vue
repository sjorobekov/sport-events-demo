<template>
  <div style="width: 150px">
    <v-avatar rounded height="40" width="60" class="mr-2" color="info lighten-4">
      {{ left }}
    </v-avatar>
    <v-avatar rounded height="40" width="60" class="ml-2" color="info lighten-4">
      {{ right }}
    </v-avatar>
  </div>
</template>

<script>
export default {
  name: 'FixtureResult',
  props: {
    me: {
      type: Object,
      required: true,
    },
  },

  computed: {
    left () {
      if (!this.me.results) {
        return 0
      }
      return this.me.results[0].score
    },
    right () {
      if (!this.me.results) {
        return 0
      }
      return this.me.results[0].opponentScore
    },
  },
}
</script>

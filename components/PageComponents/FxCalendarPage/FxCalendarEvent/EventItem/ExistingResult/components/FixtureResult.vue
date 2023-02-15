<template>
  <div class="d-flex justify-center">
    <v-avatar v-if="!hasResults" rounded height="40" width="60" color="info lighten-4">
      ―
    </v-avatar>

    <template v-else>
      <v-avatar rounded height="40" width="60" class="mr-2" color="info lighten-4">
        {{ left }}
      </v-avatar>
      <v-avatar rounded height="40" width="60" class="ml-2" color="info lighten-4">
        {{ right }}
      </v-avatar>
    </template>
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
    hasResults () {
      return !!this.me.results
    },
  },
}
</script>

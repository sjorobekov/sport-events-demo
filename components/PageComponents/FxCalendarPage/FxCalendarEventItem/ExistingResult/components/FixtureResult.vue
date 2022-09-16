<template>
  <div>
    <v-avatar rounded size="40" class="mr-2" color="#F1F5F9">
      {{ left }}
    </v-avatar>
    <v-avatar rounded size="40" class="ml-2" color="#F1F5F9">
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

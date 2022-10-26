<template>
  <div style="width: 120px">
    <v-avatar rounded size="40" class="mr-2" color="#F1F5F9">
      {{ home }}
    </v-avatar>
    <v-avatar rounded size="40" class="ml-2" color="#F1F5F9">
      {{ away }}
    </v-avatar>
  </div>
</template>

<script>
export default {
  name: 'NormalScore',
  props: {
    match: {
      type: Object,
      required: true,
    },
  },

  computed: {
    home () {
      return this.match.homeScore
    },
    away () {
      return this.match.awayScore
    },
  },
}
</script>

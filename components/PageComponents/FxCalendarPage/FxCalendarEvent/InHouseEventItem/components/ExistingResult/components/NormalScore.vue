<template>
  <div class="d-flex justify-center">
    <v-avatar rounded height="40" width="60" class="mr-2" color="neutral lighten-2">
      <span class="in-house-score">{{ home }}</span>
    </v-avatar>
    <v-avatar rounded height="40" width="60" class="ml-2" color="neutral lighten-2">
      <span class="in-house-score">{{ away }}</span>
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
<style scoped>
.in-house-score {
  color: var(--v-neutral-darken4);
}
</style>

<template>
  <span v-text="name" />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FxSportName',
  props: {
    sportId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    name: '',
  }),

  async created () {
    const sport = await this.fetchSport(this.sportId)
    this.name = sport.name
  },

  methods: {
    ...mapActions({
      fetchSport: 'api/sports/fetch',
    }),
  },
}
</script>

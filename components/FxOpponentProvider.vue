<template>
  <div>
    <slot name="default" :opponent-name="name" :logo="logo" :color="color" />
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'FxOpponentProvider',
  props: {
    opponentSchoolId: {
      type: String,
      default: undefined,
    },
    opponentId: {
      type: String,
      default: undefined,
    },
  },

  data: () => ({
    school: {},
    opponent: {},
  }),

  computed: {
    name () {
      return this.school?.name || this.opponent?.name
    },

    logo () {
      return this.school?.logo
    },

    color () {
      return this.school?.color
    },
  },

  async created () {
    if (this.opponentSchoolId) {
      this.school = await this.fetchSchool(this.opponentSchoolId)
    } else if (this.opponentId) {
      this.opponent = await this.fetchOpponent({
        schoolId: this.contextSchoolId,
        id: this.opponentId,
      })
    }
  },

  methods: {
    ...mapActions({
      fetchSchool: 'api/schools/fetch',
      fetchOpponent: 'api/opponents/fetch',
    }),
  },
}
</script>

<template>
  <span v-text="teamName" />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FxOpponentName',
  props: {
    contextSchoolId: {
      type: String,
      required: true,
    },
    opponentId: {
      type: String,
      default: undefined,
    },
    opponentSchoolId: {
      type: String,
      default: undefined,
    },
  },

  data: () => ({
    teamName: '',
  }),

  async created () {
    if (this.opponentSchoolId) {
      const school = await this.fetchSchool(this.opponentSchoolId)
      this.teamName = school.name
    } else if (this.opponentId) {
      const opponent = await this.fetchOpponent({
        schoolId: this.contextSchoolId,
        id: this.opponentId,
      })

      this.teamName = opponent.name
    }
  },

  methods: {
    ...mapActions({
      fetchOpponent: 'api/opponents/fetch',
      fetchSchool: 'api/schools/fetch',
    }),
  },
}
</script>

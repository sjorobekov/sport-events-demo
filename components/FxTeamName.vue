<template>
  <span v-text="teamName" />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FxTeamName',
  props: {
    schoolId: {
      type: String,
      required: true,
    },
    teamId: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    teamName: '',
  }),

  async created () {
    if (this.teamId) {
      const team = await this.fetchTeam({
        schoolId: this.schoolId,
        id: this.teamId,
      })

      this.teamName = team.name
    } else if (this.schoolId) {
      const school = await this.fetchSchool(this.schoolId)
      this.teamName = school.name
    }
  },

  methods: {
    ...mapActions({
      fetchTeam: 'api/teams/fetch',
      fetchSchool: 'api/schools/fetch',
    }),
  },
}
</script>

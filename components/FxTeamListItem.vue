<template>
  <client-only>
    <v-list-item v-bind="$props" :class="itemClass">
      <v-list-item-avatar class="mx-1 overflow-visible">
        <FxSchoolLogo :value="logo" :alt="name" :color="color" class="overflow-visible" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-p2 font-weight-bold px-2 neutral--text text--darken-4">
          {{ name }}
        </v-list-item-title>
      </v-list-item-content>

      <slot name="action" />
    </v-list-item>
  </client-only>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

export default {
  name: 'FxTeamListItem',
  components: { FxSchoolLogo },
  props: {
    participant: {
      type: Object,
      required: true,
    },
    itemClass: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    team: {},
    school: {},
    opponent: {},
  }),

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      contextSchool: 'context/school',
    }),
    name () {
      return this.opponent?.name || this.team?.name || this.school?.name
    },

    isMySchool () {
      return this.contextSchoolId === this.participant.schoolId
    },

    isCustomOpponent () {
      return this.participant.listedAsOpponentId && !this.participant.opponentSchoolId
    },

    logo () {
      return this.school.logo
    },

    color () {
      return this.school.color
    },
  },

  async created () {
    if (this.isCustomOpponent) {
      this.opponent = this.participant.opponent || (await this.fetchOpponent({
        schoolId: this.contextSchoolId,
        id: this.participant.listedAsOpponentId,
      }))
    }

    if (this.participant.schoolId) {
      this.school = this.participant.school || (await this.fetchSchool(this.participant.schoolId))
    }

    if ((this.isMySchool || !this.participant.schoolId) && this.participant.teamId) {
      this.team = this.participant.team || (await this.fetchTeam({
        schoolId: this.contextSchoolId,
        id: this.participant.teamId,
      }))
    }
  },

  methods: {
    ...mapActions({
      fetchTeam: 'api/teams/fetch',
      fetchSchool: 'api/schools/fetch',
      fetchOpponent: 'api/opponents/fetch',
    }),
  },
}
</script>
<style scoped>
.overflow-visible {
  overflow: visible;
}
</style>

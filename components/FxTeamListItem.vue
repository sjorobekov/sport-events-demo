<template>
  <v-list-item v-bind="$props" :class="iconOnRight ? 'flex-row-reverse': ''">
    <v-list-item-avatar class="mx-1">
      <FxSchoolLogo :value="school.logo" :alt="school.name" :color="school.color" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title :class="iconOnRight ? 'text-p2 font-weight-bold text-right': 'text-p2 font-weight-bold pl-2'">
        {{ name }}
      </v-list-item-title>
    </v-list-item-content>

    <slot name="action" />
  </v-list-item>
</template>

<script>
import { mapActions } from 'vuex'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

export default {
  name: 'FxTeamListItem',
  components: { FxSchoolLogo },
  props: {
    participant: {
      type: Object,
      required: true,
    },
    contextSchoolId: {
      type: String,
      required: true,
    },
    iconOnRight: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    team: {},
    school: {},
    opponent: {},
  }),

  computed: {
    name () {
      return this.opponent?.name || this.team?.name || this.school?.name
    },
  },

  async created () {
    if (this.participant.listedAsOpponentId && !this.participant.schoolId) {
      this.opponent = await this.fetchOpponent({
        schoolId: this.contextSchoolId,
        id: this.participant.listedAsOpponentId,
      })
    } else {
      this.school = await this.fetchSchool(this.participant.schoolId || this.contextSchoolId)
    }

    if (this.contextSchoolId === this.participant.schoolId && this.participant.teamId) {
      this.team = await this.fetchTeam({
        schoolId: this.contextSchoolId,
        id: this.participant.teamId,
      })
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

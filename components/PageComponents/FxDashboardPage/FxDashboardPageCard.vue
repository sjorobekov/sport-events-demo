<template>
  <v-row>
    <v-col cols="12" md="6" lg="3">
      <v-card>
        <v-list-item :to="{ name: 'organising-confirm-fixtures' }" class="px-8 py-4">
          <v-list-item-avatar size="40" tile>
            <v-img :src="fixturesIcon" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-p2 info--text text--darken-4 font-weight-bold">
              {{ $tc('page.Dashboard.FIXTURES_TO_CONFIRM', fixturesToConfirm) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 info--text pt-1">
              To Confirm
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" lg="3">
      <v-card>
        <v-list-item :to="{ name: 'organising-missing-results' }" class="px-8 py-4">
          <v-list-item-avatar size="40" tile>
            <v-img :src="resultsIcon" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-p2 info--text text--darken-4 font-weight-bold">
              {{ missingResults }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 info--text pt-1">
              Missing Results
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" lg="3">
      <v-card>
        <v-list-item :to="{ name: 'organising-todays-teams' }" class="px-8 py-4">
          <v-list-item-avatar size="40" tile>
            <v-img :src="teamsIcon" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-p2 info--text text--darken-4 font-weight-bold">
              {{ $tc('page.Dashboard.TEAMS_TODAY', teamsToday) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 info--text pt-1">
              Have Events Today
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" lg="3">
      <v-card>
        <v-list-item :to="{ name: 'organising-participation' }" class="px-8 py-4">
          <v-list-item-avatar size="40" tile>
            <v-img :src="studentsIcon" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-p2 info--text text--darken-4 align-self-start font-weight-bold">
              {{ $tc('page.Dashboard.STUDENTS', weekStudents) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 info--text pt-1">
              Participating (Week)
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import fixturesIcon from './fixtures.svg'
import resultsIcon from './results.svg'
import teamsIcon from './teams.svg'
import studentsIcon from './students.svg'
import { EventStatus } from '~/enum'

export default {
  name: 'FxDashboardPageCard',
  props: {
    teamsToday: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      fixturesIcon,
      resultsIcon,
      teamsIcon,
      studentsIcon,
      fixturesToConfirm: 0,
      missingResults: 0,
      weekStudents: 0,
    }
  },

  async fetch () {
    this.fixturesToConfirm = await this.getFixturesLength()
    this.missingResults = await this.getMissingResults()
    const { weekStudents } = await this.$store.dispatch('api/students/getParticipationStatistics', {
      schoolId: this.contextSchoolId,
    })
    this.weekStudents = weekStudents
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
  },

  methods: {
    async getFixturesLength () {
      const { data } = await this.$store.dispatch('api/events/getBySchool', {
        schoolId: this.contextSchoolId,
        params: { status: EventStatus.PENDING, limit: 2000 },
      })
      return data.length
    },
    async getMissingResults () {
      const { data } = await this.$store.dispatch('api/events/getBySchool', {
        schoolId: this.contextSchoolId,
        params: {
          missingResults: true,
          limit: 2000,
        },
      })
      return data.length
    },
  },
}
</script>

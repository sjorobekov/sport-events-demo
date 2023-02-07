<template>
  <v-row>
    <v-col cols="12" md="6" lg="3">
      <v-card>
        <v-list-item to="organising/confirm-fixtures" class="pa-6">
          <v-avatar rounded size="40" class="mr-2">
            <v-img width="40" :src="fixturesIcon" />
          </v-avatar>
          <div>
            <v-list-item-title class="text-p2 info--text text--darken-4 font-weight-bold">
              {{ $tc('page.Dashboard.FIXTURES_TO_CONFIRM', fixturesToConfirm) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 info--text pt-1">
              To Confirm
            </v-list-item-subtitle>
          </div>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" lg="3">
      <v-card>
        <v-list-item to="organising/missing-results" class="pa-6">
          <v-avatar rounded size="40" class="mr-2">
            <div class="d-flex justify-center">
              <v-img width="40" :src="resultsIcon" />
            </div>
          </v-avatar>
          <div>
            <v-list-item-title class="text-p2 info--text text--darken-4 font-weight-bold">
              {{ missingResults }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 info--text pt-1">
              Missing Results
            </v-list-item-subtitle>
          </div>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" lg="3">
      <v-card>
        <v-list-item to="organising/todays-teams" class="pa-6">
          <v-avatar rounded size="40" class="mr-2">
            <div class="d-flex justify-center">
              <v-img width="40" :src="teamsIcon" />
            </div>
          </v-avatar>
          <div>
            <v-list-item-title class="text-p2 info--text text--darken-4 font-weight-bold">
              {{ $tc('page.Dashboard.TEAMS_TODAY', teamsToday) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 info--text pt-1">
              Have Events Today
            </v-list-item-subtitle>
          </div>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" lg="3">
      <v-card>
        <v-list-item to="organising/participation" class="pa-6">
          <v-avatar rounded size="40" class="mr-2">
            <div class="d-flex justify-center">
              <v-img width="40" :src="studentsIcon" />
            </div>
          </v-avatar>
          <div class="d-flex flex-column">
            <v-list-item-title class="text-p2 info--text text--darken-4 align-self-start font-weight-bold">
              {{ $tc('page.Dashboard.STUDENTS', students) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 info--text pt-1">
              Participating (Week)
            </v-list-item-subtitle>
          </div>
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
  data () {
    return {
      fixturesIcon,
      resultsIcon,
      teamsIcon,
      studentsIcon,
      fixturesToConfirm: 0,
      missingResults: 0,
      teamsToday: 0,
      students: 0,
    }
  },

  async fetch () {
    this.fixturesToConfirm = await this.getFixturesLength()
    this.missingResults = await this.getMissingResults()
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
        params: { status: EventStatus.PENDING },
      })
      return data.length
    },
    async getMissingResults () {
      const { data } = await this.$store.dispatch('api/events/getBySchool', {
        schoolId: this.contextSchoolId,
        params: {
          missingResults: true,
        },
      })
      return data.length
    },
  },
}
</script>

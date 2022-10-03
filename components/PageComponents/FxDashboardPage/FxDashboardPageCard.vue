<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col class="d-flex">
          <v-list-item to="organising/confirm-fixtures">
            <v-avatar rounded size="40" class="mr-2" color="#EBF4FF">
              <div class="d-flex justify-center">
                <v-img width="24" :src="clipboard" />
              </div>
            </v-avatar>
            <div>
              <v-list-item-title class="text-p2 info--text text--darken-4">
                {{ $tc('page.Dashboard.FIXTURES_TO_CONFIRM', fixturesToConfirm) }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-p1 info--text">
                Confirm Fixtures
              </v-list-item-subtitle>
            </div>
          </v-list-item>
        </v-col>
        <v-divider vertical class="my-3" />
        <v-col class="d-flex">
          <v-list-item to="organising/missing-results">
            <v-avatar rounded size="40" class="mr-2" color="#FAE6E6">
              <div class="d-flex justify-center">
                <v-img width="24" :src="results" />
              </div>
            </v-avatar>
            <div class="d-flex flex-column">
              <v-list-item-title class="text-p2 info--text text--darken-4">
                {{ $tc('page.MissingResults.MISSING_RESULTS', missingResults) }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-p1 info--text">
                Add Results
              </v-list-item-subtitle>
            </div>
          </v-list-item>
        </v-col>
        <v-divider vertical class="my-3" />
        <v-col class="d-flex">
          <v-list-item to="organising/todays-teams">
            <v-avatar rounded size="40" class="mr-2" color="#ECFDF4">
              <div class="d-flex justify-center">
                <v-img width="24" :src="shield" />
              </div>
            </v-avatar>
            <div class="d-flex flex-column">
              <v-list-item-title class="text-p2 info--text text--darken-4">
                {{ $tc('page.Dashboard.TEAMS_TODAY', teamsToday) }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-p1 info--text">
                View Teams
              </v-list-item-subtitle>
            </div>
          </v-list-item>
        </v-col>
        <v-divider vertical class="my-3" />
        <v-col class="d-flex">
          <v-list-item to="organising/participation">
            <v-avatar rounded size="40" class="mr-2" color="#ECFDF4">
              <div class="d-flex justify-center">
                <v-img width="24" :src="growth" />
              </div>
            </v-avatar>
            <div class="d-flex flex-column">
              <v-list-item-title class="text-p2 info--text text--darken-4 align-self-start">
                {{ $tc('page.Dashboard.STUDENTS', students) }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-p1 info--text">
                Participating This Week
              </v-list-item-subtitle>
            </div>
          </v-list-item>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import results from './missing_results.svg'
import clipboard from './clipboard.svg'
import shield from './shield.svg'
import growth from './growth.svg'
import { EventStatus } from '~/enum'

export default {
  name: 'FxDashboardPageCard',
  data () {
    return {
      clipboard,
      results,
      shield,
      growth,
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

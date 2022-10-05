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
                {{ statistics.sports }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-p1 info--text">
                Sports this week
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
              <v-list-item-title class="text-p2 info--text text--darken-4 align-self-start">
                {{ statistics.events }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-p1 info--text">
                Events This Week
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
              <v-list-item-title class="text-p2 info--text text--darken-4 align-self-start">
                {{ $tc('page.Dashboard.STUDENTS', statistics.weekStudents) }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-p1 info--text">
                Participating This Week
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
                {{ $tc('page.Dashboard.STUDENTS', statistics.monthStudents) }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-p1 info--text">
                Participating This Month
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
  name: 'FxParticipationPageCard',
  data: () => ({
    clipboard,
    results,
    shield,
    growth,
    statistics: {
      sports: 0,
      events: 0,
      weekStudents: 0,
      monthStudents: 0,
    },
  }),

  async fetch () {
    this.statistics = await this.$store.dispatch('api/students/getParticipationStatistics', {
      schoolId: this.contextSchoolId,
    })
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

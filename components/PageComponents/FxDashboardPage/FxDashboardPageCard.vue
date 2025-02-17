<template>
  <v-row :dense="$vuetify.breakpoint.mdAndDown">
    <v-col cols="6" sm="3">
      <v-card class="dashboard-card">
        <v-list-item :to="{ name: 'organising-confirm-fixtures' }" class="px-4 px-lg-5 py-4 d-block d-lg-flex" :ripple="false">
          <v-icon size="56" class="dashboard-icon mr-4 pa-2">
            $vuetify.icons.score-dashboard
          </v-icon>
          <v-list-item-content class="pb-0 pb-lg-3">
            <v-list-item-title class="text-p2 neutral--text text--darken-4 font-weight-bold">
              {{ $tc('page.Dashboard.FIXTURES_TO_CONFIRM', fixturesToConfirm) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 neutral--text text--darken-3 pt-0 pt-lg-1">
              To Confirm
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="6" sm="3">
      <v-card class="dashboard-card">
        <v-list-item :to="{ name: 'organising-missing-results' }" class="px-4 px-lg-5 py-4 d-block d-lg-flex" :ripple="false">
          <v-icon size="56" class="dashboard-icon mr-4 pa-2">
            $vuetify.icons.dashboard-warning
          </v-icon>
          <v-list-item-content class="pb-0 pb-lg-3">
            <v-list-item-title class="text-p2 neutral--text text--darken-4 font-weight-bold">
              {{ missingResults }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 neutral--text text--darken-3 pt-0 pt-lg-1">
              Missing Results
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="6" sm="3">
      <v-card class="dashboard-card">
        <v-list-item :to="{ name: 'organising-todays-teams' }" class="px-4 px-lg-5 py-4 d-block d-lg-flex" :ripple="false">
          <v-icon size="56" class="dashboard-icon mr-4 pa-2">
            $vuetify.icons.dashboard-today
          </v-icon>
          <v-list-item-content class="pb-0 pb-lg-3">
            <v-list-item-title class="text-p2 neutral--text text--darken-4 font-weight-bold">
              {{ $tc('page.Dashboard.TEAMS_TODAY', teamsToday) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 neutral--text text--darken-3 pt-0 pt-lg-1">
              Have Events Today
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="6" sm="3">
      <v-card class="dashboard-card">
        <v-list-item :to="{ name: 'organising-participation' }" class="px-4 px-lg-5 py-4 d-block d-lg-flex" :ripple="false">
          <v-icon size="56" class="dashboard-icon mr-4 pa-2">
            $vuetify.icons.dashboard-chart
          </v-icon>
          <v-list-item-content class="pb-0 pb-lg-3">
            <v-list-item-title class="text-p2 neutral--text text--darken-4 align-self-start font-weight-bold">
              {{ $tc('page.Dashboard.STUDENTS', weekStudents) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 neutral--text text--darken-3 pt-0 pt-lg-1">
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

<style scoped lang="sass">
@import '~vuetify/src/styles/styles'

.dashboard-card
  transition: all .2s ease-in-out
  box-shadow: 0px 0px 10px 0px #dadfe6 !important
  border: none !important

.dashboard-icon
  background-color: var(--v-neutral-lighten3)
  border-radius: 10px
  border: solid thin #E4E9EF
  color: var(--v-primary-lighten1)
  transition: all .3s ease-in-out

.dashboard-card:hover .dashboard-icon
  color: white!important
  background-color: var(--v-primary-lighten1)
  border-color: var(--v-primary-lighten1)
.theme--light.v-list-item:before, .theme--light.v-list-item:hover:before, .theme--light.v-list-item:focus:before
  opacity: 0
</style>

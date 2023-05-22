<template>
  <v-row :dense="$vuetify.breakpoint.mdAndDown">
    <v-col cols="6" sm="3">
      <v-card class="participation-card">
        <v-list-item class="px-5 px-lg-8 py-4 d-block d-lg-flex">
          <v-icon size="56" class="participation-icon mr-4 pa-2">
            $vuetify.icons.participation-sports
          </v-icon>
          <v-list-item-content class="pb-0 pb-lg-3">
            <v-list-item-title class="text-p2 neutral--text text--darken-4 font-weight-bold">
              {{ $tc('page.Participation.SPORTS', statistics.sports) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 neutral--text text--darken-2 pt-0 pt-lg-1">
              This Week
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="6" sm="3">
      <v-card class="participation-card">
        <v-list-item class="px-5 px-lg-8 py-4 d-block d-lg-flex">
          <v-icon size="56" class="participation-icon mr-4 pa-2">
            $vuetify.icons.dashboard-today
          </v-icon>
          <v-list-item-content class="pb-0 pb-lg-3">
            <v-list-item-title class="text-p2 neutral--text text--darken-4 font-weight-bold">
              {{ $tc('page.Participation.EVENTS', statistics.events) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 neutral--text text--darken-2 pt-0 pt-lg-1">
              This Week
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="6" sm="3">
      <v-card class="participation-card">
        <v-list-item class="px-5 px-lg-8 py-4 d-block d-lg-flex">
          <v-icon size="56" class="participation-icon mr-4 pa-2">
            $vuetify.icons.participation-students
          </v-icon>
          <v-list-item-content class="pb-0 pb-lg-3">
            <v-list-item-title class="text-p2 neutral--text text--darken-4 font-weight-bold">
              {{ $tc('page.Dashboard.STUDENTS', statistics.weekStudents) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 neutral--text text--darken-2 pt-0 pt-lg-1">
              Participating (Week)
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="6" sm="3">
      <v-card class="participation-card">
        <v-list-item class="px-5 px-lg-8 py-4 d-block d-lg-flex">
          <v-icon size="56" class="participation-icon mr-4 pa-2">
            $vuetify.icons.dashboard-chart
          </v-icon>
          <v-list-item-content class="pb-0 pb-lg-3">
            <v-list-item-title class="text-p2 neutral--text text--darken-4 font-weight-bold">
              {{ $tc('page.Dashboard.STUDENTS', statistics.monthStudents) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 neutral--text text--darken-2 pt-0 pt-lg-1">
              Participating (Month)
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import whistleIcon from './whistle.svg'
import menuIcon from './menu.svg'
import groupIcon from './group.svg'
import calendarIcon from './calendar.svg'

export default {
  name: 'FxParticipationPageCard',
  data: () => ({
    whistleIcon,
    menuIcon,
    groupIcon,
    calendarIcon,
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
  },
}
</script>
<style scoped lang="sass">
@import '~vuetify/src/styles/styles'

.participation-card
  transition: all .2s ease-in-out
  box-shadow: 0px 0px 10px 0px #dadfe6 !important
  border: none !important

.participation-icon
  background-color: var(--v-neutral-lighten3)
  border-radius: 10px
  border: solid thin #E4E9EF
  color: var(--v-primary-lighten1)
  transition: all .3s ease-in-out

.participation-card:hover .participation-icon
  color: white!important
  background-color: var(--v-primary-lighten1)
  border-color: var(--v-primary-lighten1)
</style>

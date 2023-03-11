<template>
  <v-row :dense="$vuetify.breakpoint.mdAndDown">
    <v-col cols="6" sm="3">
      <v-card>
        <v-list-item class="px-5 px-lg-8 py-4 d-block d-lg-flex">
          <v-icon size="40" color="primary lighten-1" class="mr-4">
            $vuetify.icons.participationSports
          </v-icon>
          <v-list-item-content class="pb-0 pb-lg-3">
            <v-list-item-title class="text-p2 info--text text--darken-4 font-weight-bold">
              {{ $tc('page.Participation.SPORTS', statistics.sports) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 info--text pt-0 pt-lg-1">
              This Week
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="6" sm="3">
      <v-card>
        <v-list-item class="px-5 px-lg-8 py-4 d-block d-lg-flex">
          <v-icon size="40" color="primary lighten-1" class="mr-4">
            $vuetify.icons.participationEvents
          </v-icon>
          <v-list-item-content class="pb-0 pb-lg-3">
            <v-list-item-title class="text-p2 info--text text--darken-4 font-weight-bold">
              {{ $tc('page.Participation.EVENTS', statistics.events) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 info--text pt-0 pt-lg-1">
              This Week
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="6" sm="3">
      <v-card>
        <v-list-item class="px-5 px-lg-8 py-4 d-block d-lg-flex">
          <v-icon size="40" color="primary lighten-1" class="mr-4">
            $vuetify.icons.sevenDays
          </v-icon>
          <v-list-item-content class="pb-0 pb-lg-3">
            <v-list-item-title class="text-p2 info--text text--darken-4 font-weight-bold">
              {{ $tc('page.Dashboard.STUDENTS', statistics.weekStudents) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 info--text pt-0 pt-lg-1">
              Participating (Week)
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="6" sm="3">
      <v-card>
        <v-list-item class="px-5 px-lg-8 py-4 d-block d-lg-flex">
          <v-icon size="40" color="primary lighten-1" class="mr-4">
            $vuetify.icons.participating-1
          </v-icon>
          <v-list-item-content class="pb-0 pb-lg-3">
            <v-list-item-title class="text-p2 info--text text--darken-4 font-weight-bold">
              {{ $tc('page.Dashboard.STUDENTS', statistics.monthStudents) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-p1 info--text pt-0 pt-lg-1">
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

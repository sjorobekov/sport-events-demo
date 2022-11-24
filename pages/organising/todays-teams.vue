<template>
  <div>
    <v-row class="mb-2">
      <v-col cols="12" sm="5" md="12">
        <h1 class="text-h3">
          Today's Team
        </h1>
      </v-col>
      <v-col cols="6" sm="7" md="6">
        <FxDateRangePicker v-model="filter" class="mr-2"/>
      </v-col>
      <v-col cols="6" sm="12" md="6" class="text-right">
        <v-btn outlined style="background: white;" color="info base">
          <v-icon>mdi-printer-outline</v-icon>
          Print Team Sheets
        </v-btn>
      </v-col>
    </v-row>
    <v-card v-for="event in events" :key="event.id" class="mb-2">
      <FxTeamsEventItem :value="event" />
    </v-card>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'
import FxTeamsEventItem from '@/components/PageComponents/FxTodaysTeamsPage/FxTeamsEventItem'

const DATE_FORMAT = 'yyyy-MM-dd'
export default {
  name: 'TodaysTeams',
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canSeeOrganising'],
  },
  components: {
    FxTeamsEventItem,
  },
  data: () => ({
    filter: {
      startDate: new Date(),
      endDate: new Date(),
    },
    events: [],
  }),
  async fetch () {
    const { data: events } = await this.$store.dispatch('api/events/getBySchool', {
      schoolId: this.contextSchoolId,
      params: {
        limit: 2000,
        orderDesc: 'false',
        from: DateTime.fromJSDate(this.filter.startDate).toFormat(DATE_FORMAT),
        to: DateTime.fromJSDate(this.filter.endDate).toFormat(DATE_FORMAT),
      },
    })
    this.events = events
  },
  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
  },
  watch: {
    filter: {
      deep: true,
      async handler (val, old) {
        if (val.startDate !== old.startDate || val.endDate !== old.endDate) {
          await this.$fetch()
        }

        await this.$router.push({
          query: {
            ...this.filter,
            startDate: DateTime.fromJSDate(this.filter.startDate).toFormat(DATE_FORMAT),
            endDate: DateTime.fromJSDate(this.filter.endDate).toFormat(DATE_FORMAT),
          },
        })
      },
    },
  },
}
</script>

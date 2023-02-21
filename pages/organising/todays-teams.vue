<template>
  <div class="mt-4 mt-md-n4">
    <v-row class="mb-2">
      <v-col cols="12">
        <h1 class="text-h4s text-md-h3">
          Today's Team
        </h1>
      </v-col>
      <v-col cols="12" sm="6" md="5">
        <FxDateRangePicker v-model="filter" />
      </v-col>
      <v-col md="7" class="text-right hidden-sm-and-down">
        <v-btn outlined style="background: white;" color="info base">
          <v-icon>mdi-printer-outline</v-icon>
          Print Team Sheets
        </v-btn>
      </v-col>
    </v-row>
    <div v-for="event in events" :key="event.id" class="mb-2">
      <FxTeamsEventItem :value="event" />
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'
import { EventStatus } from '@/enum'
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
        status: EventStatus.CONFIRMED,
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
        if (!(val.startDate && val.endDate)) {
          return
        }
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
  created () {
    this.filter = {
      startDate: DateTime.fromFormat(this.$route.query.startDate || DateTime.now().toFormat(DATE_FORMAT), DATE_FORMAT).toJSDate(),
      endDate: DateTime.fromFormat(this.$route.query.endDate || DateTime.now().plus({ month: 1 }).toFormat(DATE_FORMAT), DATE_FORMAT).toJSDate(),
    }
  },
}
</script>

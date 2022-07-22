<template>
  <div>
    <v-card v-if="$fetchState.pending">
      <v-skeleton-loader
        type="card-avatar, article, actions"
      />
    </v-card>
    <template v-else>
      <v-card class="rounded-b-0" color="primary" dark height="80">
        <v-list-item>
          <v-list-item-content class="text-center pl-14 pt-5">
            <v-list-item-title class="text-subheading mb-1">
              <FxDateFormat :date="event.date" :output-format="DATE_HUGE" />
            </v-list-item-title>
            <v-list-item-subtitle class="text-p2 white--text">
              {{ sport.name }} &#x2022; {{ $t(`FIXTURE_TYPE.${event.fixtureType}`) }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <div>
              <v-btn icon>
                <v-icon>mdi-printer-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-card>
      <FxEventScoreBoardCard />
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="8" class="pr-4">
          <FxEventExistingResult v-if="hasResult" />
          <FxEventDetails />
          <FxEventResults id="results" />
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="4">
          <FxEventTeamSheet />
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import { EventType, EventResult } from '@/enum'
import FxEventDetails from '@/components/PageComponents/FxEventIndividualPage/FxEventDetails'
import FxEventResults from '@/components/PageComponents/FxEventIndividualPage/FxEventResults'
import FxEventTeamSheet from '@/components/PageComponents/FxEventIndividualPage/FxEventTeamSheet'
import FxEventExistingResult from '@/components/PageComponents/FxEventIndividualPage/FxEventExistingResult'
import FxEventScoreBoardCard from '@/components/PageComponents/FxEventIndividualPage/FxEventScoreBoardCard'

export default {
  name: 'FxEventIndividualPage',
  components: {
    FxEventScoreBoardCard,
    FxEventExistingResult,
    FxEventTeamSheet,
    FxEventResults,
    FxEventDetails,
  },
  props: {
    eventId: {
      type: String,
      default: undefined,
    },
  },

  data: () => ({
    EventType,
    EventResult,
    DATE_HUGE: DateTime.DATE_HUGE,
  }),

  async fetch () {
    await this.$store.dispatch('page/event/fetchData', this.eventId)
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      event: 'page/event/event',
      me: 'page/event/me',
      opponent: 'page/event/opponent',
      sport: 'page/event/sport',
      lead: 'page/event/lead',
      school: 'context/school',
      myTeam: 'page/event/myTeam',
      opponentTeam: 'page/event/opponentTeam',
      result: 'page/event/result',
      hasResult: 'page/event/hasResult',
    }),
  },

}
</script>

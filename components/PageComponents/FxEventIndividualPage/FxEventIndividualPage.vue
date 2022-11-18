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
          <v-list-item-content id="padding" class="text-center pt-5 pl-12">
            <v-list-item-title class="text-subheading mb-1 pl-md-11">
              <FxDateFormat :date="event.date" output-format="cccc dd MMMM yyyy" />
            </v-list-item-title>
            <v-list-item-subtitle class="text-p2 white--text pl-md-11">
              {{ sport.name }} &#x2022; {{ $t(`FIXTURE_TYPE.${event.fixtureType}`) }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <div>
              <v-btn icon class="hidden-sm-and-down">
                <v-icon>mdi-printer-outline</v-icon>
              </v-btn>
              <v-btn v-if="isLoggedIn" icon>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-card>
      <FxEventScoreBoardCard />
      <NuxtChild />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventType, EventResult } from '@/enum'
import FxEventScoreBoardCard from '@/components/PageComponents/FxEventIndividualPage/FxEventScoreBoardCard'

export default {
  name: 'FxEventIndividualPage',
  components: {
    FxEventScoreBoardCard,
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
      isPendingResult: 'page/event/isPendingResult',
      isLoggedIn: 'context/isLoggedIn',
    }),
  },
}
</script>

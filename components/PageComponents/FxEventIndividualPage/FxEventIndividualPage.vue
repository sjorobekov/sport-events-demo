<template>
  <FxEventMobileWrapper :is-mobile="isMobile">
    <v-card class="rounded-b-0 date-card" color="primary" dark :tile="isMobile">
      <v-list-item>
        <v-list-item-action>
          <v-btn v-if="isMobile" icon @click="$router.back()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-content class="text-center pt-5 pl-md-4">
          <v-list-item-title class="text-subheading mb-1">
            <FxDateFormat :date="event.date" output-format="cccc dd MMMM yyyy" />
          </v-list-item-title>
          <v-list-item-subtitle class="text-p2 white--text hidden-sm-and-down">
            {{ sport.name }} &#x2022; {{ $t(`FIXTURE_TYPE.${event.fixtureType}`) }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <div>
            <v-btn icon class="hidden-sm-and-down">
              <v-icon>mdi-printer-outline</v-icon>
            </v-btn>
            <v-menu>
              <template #activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>
                    $vuetify.icons.threeDots
                  </v-icon>
                </v-btn>
              </template>
              <v-list v-if="upcoming" class="grey lighten-3">
                <v-list-item @click="remove(event)">
                  <v-list-item-content>
                    <v-list-item-title class="text--info text--darken-1">
                      Delete Event
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-list-item-action>
      </v-list-item>

      <div class="hidden-md-and-up">
        <div class="d-flex px-3 pb-3">
          <v-chip outlined class="event-header-chip">
            {{ sport.name }}
          </v-chip>
          <v-spacer />
          <v-chip outlined class="event-header-chip">
            {{ $t(`EVENT_TYPE.${event.eventType}`) }}
          </v-chip>
        </div>
      </div>
    </v-card>
    <FxEventScoreBoardCard />
    <NuxtChild />
</FxEventMobileWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import FxEventScoreBoardCard from '@/components/PageComponents/FxEventIndividualPage/FxEventScoreBoardCard'
import FxEventMobileWrapper from '~/components/FxEventMobileWrapper/index.vue'

export default {
  name: 'FxEventIndividualPage',
  components: {
    FxEventMobileWrapper,
    FxEventScoreBoardCard,
  },

  data: () => ({
    dateNow: new Date(),
  }),

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
      isMobileDevice: 'context/isMobile',
      isTabletDevice: 'context/isTablet',
    }),

    isMobile () {
      if (process.client) {
        return this.$vuetify.breakpoint.smAndDown
      }

      return this.isMobileDevice || this.isTabletDevice
    },

    today () {
      return DateTime.now().toFormat('yyyy-MM-dd')
    },

    upcoming () {
      return this.event.date >= this.today
    },
  },
  methods: {
    remove () {
      const warning = 'Hey there! Just wanted to make sure you\'re aware that deleting this event will remove it for both schools. ' +
        'If the event has been cancelled or postponed, it might be a good idea to update the status instead so everyone is in the loop. ' +
        'Are you still sure you want to delete it?'
      if (!confirm(warning)) {
        return
      }

      this.$store.dispatch('api/events/remove', {
        schoolId: this.contextSchoolId,
        id: this.event.id,
      }).then(() => {
        this.$toast('Event has been removed')
        this.$router.push({ name: 'teams-id', params: { id: team.id } })
      }).catch(() => {
        this.$toast.error('Unknown Error')
      })
    },
  },
}
</script>

<style scoped lang="sass">
@import '~vuetify/src/styles/styles.sass'
.event-header-chip
  border-color: rgba(255, 255, 255, 0.5)
.date-card
  border: 1px solid #E4E9EF!important
  border-bottom: none!important

@media #{map-get($display-breakpoints, 'sm-and-down')}
  .date-card.v-card
    border-radius: 0!important
    border: none!important
</style>

<template>
  <wrapped-component :wrap="isMobile">
    <template #wrapper>
      <FxEventMobileContainer />
    </template>
    <div>
      <v-card class="rounded-b-0" color="primary" dark :tile="isMobile">
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
              <v-btn v-if="isLoggedIn" icon>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
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
    </div>
  </wrapped-component>
</template>

<script>
import { mapGetters } from 'vuex'
import FxEventScoreBoardCard from '@/components/PageComponents/FxEventIndividualPage/FxEventScoreBoardCard'
import FxEventMobileContainer from '@/components/PageComponents/FxEventIndividualPage/FxEventMobilePage'

export default {
  name: 'FxEventDesktopPage',
  components: {
    FxEventMobileContainer,
    FxEventScoreBoardCard,
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
      isMobileDevice: 'context/isMobile',
      isTabletDevice: 'context/isTablet',
    }),

    isMobile () {
      if (process.client) {
        return this.$vuetify.breakpoint.smAndDown
      }

      return this.isMobileDevice || this.isTabletDevice
    },
  },
}
</script>

<style scoped lang="sass">
.event-header-chip
  border-color: rgba(255, 255, 255, 0.5)
</style>

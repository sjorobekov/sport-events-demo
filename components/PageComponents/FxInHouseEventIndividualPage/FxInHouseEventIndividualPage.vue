<template>
  <FxEventMobileWrapper :is-mobile="isMobile">
    <v-card class="rounded-b-0 date-card" color="primary" dark>
      <v-list-item>
        <v-list-item-action>
          <v-btn v-if="isMobile" icon @click="$router.back()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-list-item-action>

        <v-list-item-content class="text-center pl-md-4 pt-5">
          <v-list-item-title class="text-subheading mb-1">
            <FxDateFormat :date="match.date" output-format="cccc dd MMMM yyyy" />
          </v-list-item-title>
          <v-list-item-subtitle class="text-p2 white--text hidden-sm-and-down">
            <span v-if="inHouseEvent.name">{{ inHouseEvent.name }} - </span>
            {{ sport.name }} &#x2022; In-House Sport
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
            <span v-if="inHouseEvent.name">{{ inHouseEvent.name }} -&nbsp;</span>{{ sport.name }}
          </v-chip>
          <v-spacer />
          <v-chip outlined class="event-header-chip">
            {{ $t(`IN_HOUSE_EVENT_TYPE.${inHouseEvent.eventType}`) }}
          </v-chip>
        </div>
      </div>
    </v-card>
    <FxInHouseEventScoreBoardCard />
    <NuxtChild />
  </FxEventMobileWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import FxInHouseEventScoreBoardCard from '@/components/PageComponents/FxInHouseEventIndividualPage/FxInHouseEventScoreBoardCard'
import FxEventMobileWrapper from '~/components/FxEventMobileWrapper/index.vue'

export default {
  name: 'FxInHouseEventIndividualPage',
  components: {
    FxEventMobileWrapper,
    FxInHouseEventScoreBoardCard,
  },

  computed: {
    ...mapGetters({
      inHouseEvent: 'page/inHouseEvent/inHouseEvent',
      sport: 'page/inHouseEvent/sport',
      match: 'page/inHouseEvent/inHouseMatch',
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

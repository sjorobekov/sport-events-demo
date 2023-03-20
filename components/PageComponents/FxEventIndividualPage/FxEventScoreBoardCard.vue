<template>
  <v-card class="rounded-t-0 pa-6 score-card ">
    <table style="width: 100%">
      <tbody>
        <tr class="hover-none">
          <td class="text-center team-cell pb-2 pb-md-3">
            <wrapped-component :wrap="!!myTeam">
              <template #wrapper>
                <nuxt-link class="text-decoration-none" :to="{ name: 'teams-id', params: { id: myTeamId } }" />
              </template>
              <FxSchoolLogo class="mx-auto" size="64" :value="school.logo" :alt="leftLabel" :color="school.color" />
            </wrapped-component>
          </td>
          <td rowspan="2">
            <FxEventResultCenterBoard />
          </td>
          <td class="text-center team-cell pb-2 pb-md-3">
            <wrapped-component v-if="opponentTeam" :wrap="!!opponentLink">
              <template #wrapper>
                <a :href="opponentLink" class="text-decoration-none" />
              </template>
              <FxSchoolLogo class="mx-auto" size="64" :value="opponentTeam.logo" :alt="rightLabel" :color="opponentTeam.color" />
            </wrapped-component>
            <v-icon v-else size="64" color="info darken-2" v-text="icon" />
          </td>
        </tr>
        <tr class="hover-none">
          <td class="text-center team-name px-2 px-md-6">
            <wrapped-component :wrap="!!myTeam">
              <template #wrapper>
                <nuxt-link class="text-decoration-none neutral--text text--darken-4" :to="{ name: 'teams-id', params: { id: myTeamId } }" />
              </template>
              <span>{{ leftLabel }}</span>
            </wrapped-component>
          </td>
          <td class="text-center team-name px-2 px-md-6">
            <wrapped-component :wrap="!!opponentLink">
              <template #wrapper>
                <a :href="opponentLink" class="text-decoration-none neutral--text text--darken-4" />
              </template>
              <span class="neutral--text text--darken-4">{{ rightLabel }}</span>
            </wrapped-component>
          </td>
        </tr>
      </tbody>
    </table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import { EventType, EventResult } from '@/enum'
import FxEventResultCenterBoard from '@/components/PageComponents/FxEventIndividualPage/FxEventResultCenterBoard'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

const iconEventTypeMap = {
  [EventType.MULTI_EVENT]: '$vuetify.icons.sports',
  [EventType.TOURNAMENT]: '$vuetify.icons.tournament',
  [EventType.TRAINING]: '$vuetify.icons.tactic',
}

export default {
  name: 'FxEventScoreBoardCard',
  components: {
    FxSchoolLogo,
    FxEventResultCenterBoard,
  },
  data: () => ({
    EventType,
    EventResult,
    DATE_HUGE: DateTime.DATE_HUGE,
  }),
  computed: {
    ...mapGetters({
      event: 'page/event/event',
      school: 'context/school',
      myTeam: 'page/event/myTeam',
      opponentTeam: 'page/event/opponentTeam',
    }),

    opponentLink () {
      if (this.opponentTeam?.portalAddress) {
        return this.$config.PORTAL_WILDCARD.replace('*', this.opponentTeam.portalAddress)
      }
      return false
    },

    leftLabel () {
      return this.myTeam?.name || this.school?.name || ''
    },

    icon () {
      return iconEventTypeMap[this.event.eventType]
    },

    rightLabel () {
      if (this.opponentTeam) {
        return this.opponentTeam.name
      }

      if (this.event.name) {
        return this.event.name
      }

      return this.$t(`EVENT_TYPE.${this.event.eventType}`)
    },

    myTeamId () {
      return this.myTeam?.id
    },
  },
}
</script>

<style scoped lang="sass">
@import '~vuetify/src/styles/styles.sass'
.team-name
  font-size: 1.4375rem
  line-height: 1.3rem
  font-family: ProximaNova-Semibold, sans-serif
.team-cell
  width: 40%
.score-card
  border-top-left-radius: 0!important
  border-top-right-radius: 0!important
  border-bottom-left-radius: 12px!important
  border-bottom-right-radius: 12px!important

.hover-none:hover
  background-color: white!important

@media #{map-get($display-breakpoints, 'sm-and-down')}
  .team-name
    font-size: 0.975rem
    line-height: 1rem

  .score-card.v-card
    border-radius: 0!important
    border: 0!important

</style>

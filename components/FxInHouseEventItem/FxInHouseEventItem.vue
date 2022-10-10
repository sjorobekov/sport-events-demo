<template>
  <v-container :style="style" class="rounded">
    <v-row v-if="!compact">
      <v-col cols="12" class="border-bottom pt-1 pb-0">
        <v-list-item class="px-0">
          <v-list-item-content>
            <v-list-item-title class="text-p2" v-text="date" />
          </v-list-item-content>
          <v-spacer />
          <slot name="actions" />
        </v-list-item>
      </v-col>
    </v-row>
    <v-row v-if="compact">
      <v-col md="6" class="border-bottom pt-1 pb-0">
        <v-list-item class="px-0">
          <v-list-item-content>
            <v-list-item-title class="text-p2" v-text="date" />
          </v-list-item-content>
          <v-spacer />
          <slot name="actions" />
        </v-list-item>
      </v-col>

      <v-col cols="2" class="border-bottom pt-0 pb-0">
        <v-list-item class="px-0">
          <v-list-item-content>
            <v-list-item-title class="d-flex justify-center in-house-event-time" v-text="time" />
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-row v-if="compact">
      <v-col class="pa-0" style="margin-bottom: -41px">
        <slot name="actions" />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="!compact" cols="2" xl="1">
        <v-list-item class="px-0">
          <v-list-item-content>
            <v-list-item-title class="d-flex justify-center in-house-event-time" v-text="time" />
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col v-if="!isAllHouseEvent && me" cols="12" md="4" class="border-bottom">
        <FxInHouseTeamListItem class="pl-0" :participant="me" :context-school-id="contextSchoolId" :icon-on-right="!compact" />
      </v-col>
      <v-col v-if="!isAllHouseEvent && opponent" cols="12" md="4" class="border-bottom">
        <FxInHouseTeamListItem class="pl-0" :participant="opponent" :context-school-id="contextSchoolId" />
      </v-col>
    </v-row>
    <v-row v-if="isAllHouseEvent">
      <v-col v-for="inHouseTeam in filteredTeams" :key="inHouseTeam.id" cols="12" md="4" class="border-bottom">
        <FxInHouseTeamListItem class="pl-0" :participant="inHouseTeam" :context-school-id="contextSchoolId" :icon-on-right="!compact" />
      </v-col>
    </v-row>
    <slot name="bottom" />
  </v-container>
</template>

<script>
import { DateTime } from 'luxon'
import { EventType, InHouseEventType } from '@/enum'

export default {
  name: 'FxInHouseEventItem',
  props: {
    match: {
      type: Object,
      default: () => {},
    },
    me: {
      type: Object,
      default: () => {},
    },
    opponent: {
      type: Object,
      default: () => {},
    },
    contextSchoolId: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    sport: {},
    user: {},
    EventType,
    teams: [],
  }),

  computed: {
    compact () {
      return this.$vuetify.breakpoint.smAndDown
    },

    style () {
      return { borderLeft: `${this.sport?.color} 8px solid` }
    },

    date () {
      return this.match
        ? DateTime.fromISO(this.match.date).toFormat('dd-MM-yyyy')
        : '00-00-00'
    },

    time () {
      return this.match
        ? DateTime.fromISO(this.match.startTime).toFormat('HH:mm')
        : '00:00'
    },
    isAllHouseEvent () {
      return this.eventType === InHouseEventType.ALL_HOUSES
    },
    filteredTeams () {
      return this.teams
    },
  },

  async created () {
    if (this.match?.inHouseEvent) {
      this.sport = await this.$store.dispatch('api/sports/fetch', this.match.inHouseEvent.inHouseCompetition.sportId)
      this.user = await this.$store.dispatch('api/users/fetch', {
        schoolId: this.contextSchoolId,
        id: this.match.inHouseEvent.leadId,
      })
    }
    this.teams = await this.$store.dispatch('api/inHouseTeams/list', {
      schoolId: this.contextSchoolId,
    })
  },
}
</script>

<style lang="scss" scoped>
.in-house-event-time {
  border: 1px solid var(--v-info-base);
  border-radius: 5px;
  color: var(--v-info-base);
  padding: 0.2em 0em;
}
</style>

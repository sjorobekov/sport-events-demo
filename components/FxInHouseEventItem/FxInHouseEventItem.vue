<template>
  <v-container :style="style" class="rounded">
    <v-row>
      <v-col cols="12" class="border-bottom pt-1 pb-0">
        <v-list-item class="px-0">
          <v-list-item-content>
            <v-list-item-title class="text-p2">
              {{ date }}
              <span class="info--text text--lighten-1">{{ event.name }}</span>
            </v-list-item-title>
          </v-list-item-content>

          <slot name="actions">
            <span class="in-house-event-time" style="font-size: 12px; line-height: 18px" v-text="time" />
          </slot>
        </v-list-item>
      </v-col>
    </v-row>
    <v-row v-if="!isAllHouseEvent">
      <v-col v-if="!isAllHouseEvent && me" cols="12" md="6">
        <FxInHouseTeamListItem class="pl-0" :participant="me" :context-school-id="contextSchoolId" />
      </v-col>
      <v-col v-if="!isAllHouseEvent && opponent" cols="12" md="6">
        <FxInHouseTeamListItem class="pl-0" :participant="opponent" :context-school-id="contextSchoolId" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <AllInHouseTeamsProvider style="max-width: 100%" class="d-flex flex-wrap flex-column flex-md-row justify-md-center">
          <template #default="{ teams }">
            <FxInHouseTeamListItem
              v-for="inHouseTeam in teams"
              :key="inHouseTeam.id"
              class="pl-0"
              :participant="inHouseTeam"
              :context-school-id="contextSchoolId"
              item-class="flex-row flex-md-row-reverse text-md-right"
              style="max-width: fit-content"
            />
          </template>
        </AllInHouseTeamsProvider>
      </v-col>
    </v-row>

    <slot name="bottom" />
  </v-container>
</template>

<script>
import { DateTime } from 'luxon'
import { EventType, InHouseEventType } from '@/enum'
import AllInHouseTeamsProvider
  from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/InHouseEventItem/components/AllInHouseTeamsProvider'

export default {
  name: 'FxInHouseEventItem',
  components: { AllInHouseTeamsProvider },
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
    hideSportColor: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    EventType,
  }),

  computed: {
    compact () {
      return this.$vuetify.breakpoint.smAndDown
    },

    style () {
      return this.hideSportColor ? {} : { borderLeft: `${this.sport?.color} 8px solid` }
    },

    date () {
      return this.match
        ? DateTime.fromISO(this.match.date).toFormat('cccc d MMM yyyy')
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

    event () {
      return this.match.inHouseEvent
    },

    sport () {
      return this.match.inHouseEvent?.inHouseCompetition?.sport
    },
  },
}
</script>

<style lang="scss" scoped>
.in-house-event-time {
  border: 1px solid var(--v-info-base);
  border-radius: 5px;
  color: var(--v-info-base);
  padding: 0.2em 1em;
  font-size: 12px;
  line-height: 18px
}
</style>

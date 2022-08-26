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
      <v-col cols="12" md="4" class="border-bottom">
        <FxInHouseTeamListItem class="pl-0" :participant="me" :context-school-id="contextSchoolId" :icon-on-right="!compact" />
      </v-col>
      <v-col cols="12" md="4" class="border-bottom">
        <FxInHouseTeamListItem class="pl-0" :participant="opponent" :context-school-id="contextSchoolId" />
      </v-col>
    </v-row>
    <slot name="bottom" />
  </v-container>
</template>

<script>
import { DateTime } from 'luxon'
import { EventType } from '@/enum'

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
  },

  data: () => ({
    sport: {},
    team: {},
    user: {},
    EventType,
  }),

  computed: {
    compact () {
      return this.$vuetify.breakpoint.smAndDown
    },

    style () {
      return { borderLeft: `${this.sport?.color} 8px solid` }
    },

    date () {
      return DateTime.fromISO(this.match.date).toLocaleString({ weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' })
    },

    time () {
      return DateTime.fromISO(this.match.startTime).toFormat('HH:mm')
    },
  },

  async created () {
    this.sport = await this.$store.dispatch('api/sports/fetch', this.match.inHouseEvent.inHouseCompetition.sportId)
    this.user = await this.$store.dispatch('api/users/fetch', {
      schoolId: this.contextSchoolId,
      id: this.match.inHouseEvent.leadId,
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

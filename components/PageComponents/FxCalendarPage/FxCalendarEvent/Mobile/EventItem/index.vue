<template>
  <FxCalendarEventMobileLayout :sport="sport" :to="{ name: 'events-eventId', params: { eventId: event.id } }">
    <template #status>
      <v-chip
        v-if="me.overallResult === EventResult.TO_BE_PLAYED"
        color="info lighten-2"
        outlined
        dark
        label
        class="pr-3 radius-6 height-24"
      >
        <span class="info--text">{{ event.startTime }}</span>
      </v-chip>
      <FxEventStatus v-else-if="me.overallResult && canSeeResults" :overall-result="me.overallResult" />
    </template>

    <FxTeamListItem class="px-0" :participant="me" :context-school-id="contextSchoolId">
      <template #action>
        <v-list-item-avatar rounded width="60" class="mr-2" color="info lighten-4">
          {{ left }}
        </v-list-item-avatar>
      </template>
    </FxTeamListItem>

    <FxTeamListItem v-if="event.eventType === EventType.FIXTURE" class="px-0" :participant="opponent" :context-school-id="contextSchoolId">
      <template #action>
        <v-list-item-avatar rounded width="60" class="mr-2" color="info lighten-4">
          {{ right }}
        </v-list-item-avatar>
      </template>
    </FxTeamListItem>
    <FxNonFixtureItem v-else :event-type="event.eventType" :name="event.name" class="px-0">
      <template #action>
        <v-list-item-avatar rounded width="60" class="mr-2" color="info lighten-4">
          {{ right }}
        </v-list-item-avatar>
      </template>
    </FxNonFixtureItem>
  </FxCalendarEventMobileLayout>
</template>

<script>
import { mapGetters } from 'vuex'
import FxCalendarEventMobileLayout from '../FxCalendarEventMobileLayout'
import { EventResult, EventType, PublishResult } from '@/enum'

export default {
  name: 'EventItem',
  components: { FxCalendarEventMobileLayout },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    EventType,
    EventResult,
  }),

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),

    event () {
      return this.value
    },

    me () {
      return this.event.me
    },

    opponent () {
      return this.event.opponent
    },

    sport () {
      return this.event.sport
    },

    left () {
      if (!this.me.results) {
        return '-'
      }
      return this.me.results[0].score || '-'
    },

    right () {
      if (!this.me.results) {
        return '-'
      }
      return this.me.results[0].opponentScore || '-'
    },

    myTeam () {
      return this.me.team
    },

    canSeeResults () {
      return [PublishResult.RESULTS, PublishResult.RESULTS_SCORES].includes(this.myTeam?.publishResults)
    },
  },
}
</script>

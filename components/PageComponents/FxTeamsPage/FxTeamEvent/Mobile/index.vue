<template>
  <FxTeamEventMobileLayout>
    <template #date>
      <v-list-item class="px-0">
        <v-list-item-content>
          <v-list-item-title class="text-p2">
            <FxDateFormat :date="event.date" output-format="cccc dd MMMM yyyy" />
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
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
        </v-list-item-action>
      </v-list-item>
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
        <v-list-item-avatar rounded size="40" class="mr-2" color="info lighten-4">
          {{ right }}
        </v-list-item-avatar>
      </template>
    </FxNonFixtureItem>
  </FxTeamEventMobileLayout>
</template>

<script>
import { mapGetters } from 'vuex'
import FxTeamEventMobileLayout from './FxTeamEventMobileLayout'
import { EventResult, EventType, PublishResult } from '@/enum'
export default {
  name: 'FxTeamEventMobile',
  components: { FxTeamEventMobileLayout },
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
      isLoggedIn: 'context/isLoggedIn',
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
      return this.isLoggedIn || PublishResult.RESULTS_SCORES === this.myTeam.publishResults
    },
  },
}
</script>

<template>
  <CalendarItemLayout :sport="event.sport" :lead="me.lead" :to="{ name: 'events-eventId', params: { eventId: event.id } }">
    <template #status>
      <FxEventStatus :overall-result="me.overallResult" />
    </template>
    <template #left="{ compact }">
      <FxTeamListItem class="pl-0" :participant="me" :context-school-id="contextSchoolId" :icon-on-right="!compact" />
    </template>
    <template #score>
      <ExistingResult v-if="hasResult" :event="event" :me="me" />
      <NoResult v-else :me="me" :event="event" />
    </template>
    <template #right>
      <FxTeamListItem v-if="event.eventType === EventType.FIXTURE" class="pl-0" :participant="opponent" :context-school-id="contextSchoolId" />
      <FxNonFixtureItem v-else :event-type="event.eventType" :name="event.name" />
    </template>
    <template #time>
      <div>
        <div v-if="me.meetTime" class="d-inline-block pr-8">
          <v-list-item-title class="text-p2 info--text text--darken-4">
            {{ me.meetTime }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-p1 info--text">
            Meet Time
          </v-list-item-subtitle>
        </div>
        <div class="d-inline-block pr-8">
          <v-list-item-title class="text-p2 info--text text--darken-4">
            {{ event.startTime }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-p1 info--text">
            Start Time
          </v-list-item-subtitle>
        </div>
        <div v-if="me.returnTime" class="d-inline-block">
          <v-list-item-title class="text-p2 info--text text--darken-4">
            {{ me.returnTime }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-p1 info--text">
            Return Time
          </v-list-item-subtitle>
        </div>
      </div>
    </template>
    <template #location>
      <FxLocationLabel :event="event" :me="me" />
    </template>
    <template #transport>
      <v-list-item v-if="!me.noNeedTransport" class="pt-2">
        <v-list-item-icon>
          <v-icon>$vuetify.icons.direction</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="py-0">
          <div>
            <div v-if="me.transportTo" class="d-block pr-8">
              <v-list-item-title class="text-p2 info--text text--darken-4">
                <v-icon>$vuetify.icons.arrowRight</v-icon> {{ transportTo }}
              </v-list-item-title>
            </div>
            <div v-if="me.transportFrom" class="d-block">
              <v-list-item-title class="text-p2 info--text text--darken-4">
                <v-icon>$vuetify.icons.arrowLeft</v-icon> {{ transportFrom }}
              </v-list-item-title>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </template>
  </CalendarItemLayout>
<!--  <v-container :style="style" class="rounded">-->
<!--    <v-row v-if="!compact">-->
<!--      <v-col cols="12" class="border-bottom pt-1 pb-0">-->
<!--        <v-list-item class="px-0">-->
<!--          <v-list-item-icon class="mr-3">-->
<!--            <v-avatar size="22">-->
<!--              <v-img :src="sport.icon" />-->
<!--            </v-avatar>-->
<!--          </v-list-item-icon>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title class="text-p2" v-text="sport.name" />-->
<!--          </v-list-item-content>-->
<!--          <v-spacer />-->
<!--          <slot name="actions" />-->
<!--        </v-list-item>-->
<!--      </v-col>-->
<!--    </v-row>-->
<!--    <v-row v-if="compact">-->
<!--      <v-col class="pa-0" style="margin-bottom: -41px">-->
<!--        <slot name="actions" />-->
<!--      </v-col>-->
<!--    </v-row>-->
<!--    <v-row>-->
<!--      <v-col md="2" class="border-bottom pt-6">-->
<!--        <FxEventStatus :overall-result="me.overallResult" />-->
<!--      </v-col>-->
<!--      <v-col cols="12" md="3" class="border-bottom">-->
<!--        <FxTeamListItem class="pl-0" :participant="me" :context-school-id="contextSchoolId" :icon-on-right="!compact" />-->
<!--      </v-col>-->
<!--      <v-col md="2" class="hidden-sm-and-down pt-5 border-bottom text-center">-->
<!--        <ExistingResult v-if="hasResult" :event="event" :me="me" />-->
<!--        <NoResult v-else :me="me" :event="event" />-->
<!--      </v-col>-->
<!--      <v-col cols="12" md="5" class="border-bottom">-->
<!--        <FxTeamListItem v-if="event.eventType === EventType.FIXTURE" class="pl-0" :participant="opponent" :context-school-id="contextSchoolId" />-->
<!--        <FxNonFixtureItem v-else :event-type="event.eventType" :name="event.name" />-->
<!--      </v-col>-->
<!--    </v-row>-->
<!--    <v-row v-if="compact">-->
<!--      <v-col cols="12" class="border-bottom pt-1 pb-0">-->
<!--        <ListItem>-->
<!--          <template #icon>-->
<!--            <v-avatar size="22">-->
<!--              <v-img width="22" height="22" :src="sport.icon" />-->
<!--            </v-avatar>-->
<!--          </template>-->
<!--          <template #title>-->
<!--            {{ sport.name }}-->
<!--          </template>-->
<!--          <template #subtitle>-->
<!--            Sport-->
<!--          </template>-->
<!--        </ListItem>-->
<!--      </v-col>-->
<!--    </v-row>-->
<!--    <v-row>-->
<!--      <v-col cols="12" md="6" lg="3" class="border-bottom border-right pt-1 pb-0">-->
<!--        <ListItem>-->
<!--          <template #icon>-->
<!--            <v-icon>mdi-clock-outline</v-icon>-->
<!--          </template>-->
<!--          <template #content>-->
<!--            <div>-->
<!--              <div v-if="me.meetTime" class="d-inline-block pr-8">-->
<!--                <v-list-item-title class="text-p2 info&#45;&#45;text text&#45;&#45;darken-4">-->
<!--                  {{ me.meetTime }}-->
<!--                </v-list-item-title>-->
<!--                <v-list-item-subtitle class="text-p1 info&#45;&#45;text">-->
<!--                  Meet Time-->
<!--                </v-list-item-subtitle>-->
<!--              </div>-->
<!--              <div class="d-inline-block pr-8">-->
<!--                <v-list-item-title class="text-p2 info&#45;&#45;text text&#45;&#45;darken-4">-->
<!--                  {{ event.startTime }}-->
<!--                </v-list-item-title>-->
<!--                <v-list-item-subtitle class="text-p1 info&#45;&#45;text">-->
<!--                  Start Time-->
<!--                </v-list-item-subtitle>-->
<!--              </div>-->
<!--              <div v-if="me.returnTime" class="d-inline-block">-->
<!--                <v-list-item-title class="text-p2 info&#45;&#45;text text&#45;&#45;darken-4">-->
<!--                  {{ me.returnTime }}-->
<!--                </v-list-item-title>-->
<!--                <v-list-item-subtitle class="text-p1 info&#45;&#45;text">-->
<!--                  Return Time-->
<!--                </v-list-item-subtitle>-->
<!--              </div>-->
<!--            </div>-->
<!--          </template>-->
<!--        </ListItem>-->
<!--      </v-col>-->
<!--      <v-col cols="12" md="6" lg="3" class="border-bottom border-right pt-1 pb-0">-->
<!--        <ListItem>-->
<!--          <template #icon>-->
<!--            <FxAvatar :size="24" :value="user.avatar" />-->
<!--          </template>-->
<!--          <template #title>-->
<!--            {{ user.firstname }} {{ user.lastname }}-->
<!--          </template>-->
<!--        </ListItem>-->
<!--      </v-col>-->
<!--      <v-col cols="12" md="6" lg="3" class="border-bottom border-right pt-1 pb-0">-->
<!--        <ListItem>-->
<!--          <template #icon>-->
<!--            <v-icon>mdi-map-marker</v-icon>-->
<!--          </template>-->
<!--          <template #title>-->
<!--            <FxLocationLabel :event="event" :me="me" />-->
<!--          </template>-->
<!--        </ListItem>-->
<!--      </v-col>-->
<!--      <v-col cols="12" md="6" lg="3" class="py-0">-->
<!--        <v-list-item v-if="!me.noNeedTransport" class="pt-2">-->
<!--          <v-list-item-icon>-->
<!--            <v-icon>$vuetify.icons.direction</v-icon>-->
<!--          </v-list-item-icon>-->
<!--          <v-list-item-content class="py-0">-->
<!--            <div>-->
<!--              <div v-if="me.transportTo" class="d-block pr-8">-->
<!--                <v-list-item-title class="text-p2 info&#45;&#45;text text&#45;&#45;darken-4">-->
<!--                  <v-icon>$vuetify.icons.arrowRight</v-icon> {{ transportTo }}-->
<!--                </v-list-item-title>-->
<!--              </div>-->
<!--              <div v-if="me.transportFrom" class="d-block">-->
<!--                <v-list-item-title class="text-p2 info&#45;&#45;text text&#45;&#45;darken-4">-->
<!--                  <v-icon>$vuetify.icons.arrowLeft</v-icon> {{ transportFrom }}-->
<!--                </v-list-item-title>-->
<!--              </div>-->
<!--            </div>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
<!--      </v-col>-->
<!--    </v-row>-->
<!--  </v-container>-->
</template>

<script>
import { mapGetters } from 'vuex'
import FxLocationLabel from '@/components/FxEventItem/FxLocationLabel'
import { EventResult, EventType, TransportType } from '@/enum'
import ExistingResult
  from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/EventItem/ExistingResult/ExistingResult'
import NoResult from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/EventItem/NoResult/NoResult'
import CalendarItemLayout from '@/components/PageComponents/FxCalendarPage/FxCalendarEvent/CalendarItemLayout'

export default {
  name: 'EventItem',
  components: {
    CalendarItemLayout,
    NoResult,
    ExistingResult,
    FxLocationLabel,
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    sport: {},
    team: {},
    user: {},
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

    style () {
      return { borderLeft: `${this.sport?.color} 8px solid` }
    },

    transportTo () {
      if (this.me.transportTo === TransportType.OTHER) {
        return this.me.transportToOther
      }

      return this.$t(`TRANSPORT_TO.${this.me.transportTo}`)
    },

    transportFrom () {
      if (this.me.transportFrom === TransportType.OTHER) {
        return this.me.transportFromOther
      }

      return this.$t(`TRANSPORT_FROM.${this.me.transportTo}`)
    },

    hasResult () {
      return [
        EventResult.WIN,
        EventResult.LOST,
        EventResult.DRAW,
        EventResult['1ST'],
        EventResult['2ND'],
        EventResult['3RD'],
        EventResult.SEE_EVENT_RESULTS,
      ].includes(this.me.overallResult)
    },
  },
}
</script>

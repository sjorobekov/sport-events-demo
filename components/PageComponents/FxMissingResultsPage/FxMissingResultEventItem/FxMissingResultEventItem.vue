<template>
  <v-container>
    <v-row class="d-flex align-center border-bottom">
      <v-col md="2" class="pt-6" :class="{ 'border-bottom': compact }">
        <div class="info--text text-caption time text-center">
          {{ event.startTime }}
        </div>
        <div class="info--text text--darken-1 text-caption text-center mt-2 mx-auto">
          {{ date }}
        </div>
      </v-col>
      <v-col cols="12" md="3" :class="{ 'border-bottom': compact }">
        <FxTeamListItem class="pl-0" :participant="me" :context-school-id="contextSchoolId" item-class="flex-row flex-md-row-reverse text-md-right" />
      </v-col>
      <v-col md="2" class="hidden-sm-and-down text-center" :class="{ 'border-bottom': compact }">
        <div>
          <v-avatar rounded size="40" class="mr-2" color="#F1F5F9">
            -
          </v-avatar>
          <v-avatar rounded size="40" class="ml-2" color="#F1F5F9">
            -
          </v-avatar>
        </div>
      </v-col>
      <v-col cols="12" md="3" :class="{ 'border-bottom': compact }">
        <FxTeamListItem v-if="event.eventType === EventType.FIXTURE" class="pl-0" :participant="opponent" :context-school-id="contextSchoolId" />
        <FxNonFixtureItem v-else :event-type="event.eventType" :name="event.name" />
      </v-col>
      <v-col md="2">
        <v-btn link outlined :to="{ name: 'events-eventId', params: { eventId: event.id } }">
          Add Result
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import { EventType } from '@/enum'

export default {
  name: 'FxMissingResultEventItem',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    EventType,
  }),

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
    compact () {
      return this.$vuetify.breakpoint.smAndDown
    },

    event () {
      return this.value
    },

    me () {
      return this.value.me
    },

    opponent () {
      return this.value.opponent
    },

    date () {
      return DateTime.fromFormat(this.value.date, 'yyyy-MM-dd').toFormat('dd LLL yyyy')
    },
  },

}
</script>

<style scoped>
.time {
  padding: 4px;
  border: 1px solid var(--v-info-lighten1);
  border-radius: 6px;
  width: 44px;
  height: 22px;
  margin: auto;
  line-height: 14px;
}
</style>

<template>
  <v-container class="custom-child-border">
    <v-row align="center">
      <v-col class="hidden-sm-and-down" md="2">
        <div class="info--text text-caption time text-center">
          {{ event.startTime }}
        </div>
        <div class="info--text text--darken-1 text-caption text-center mt-2 mx-auto">
          {{ date }}
        </div>
      </v-col>
      <v-col class="hidden-md-and-up pl-5 pb-0">
        <div class="info--text text-caption">
          {{ event.startTime }}
        </div>
        <div class="info--text text--darken-1 text-caption mt-2 mx-auto">
          {{ date }}
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <FxTeamListItem class="pl-0" :participant="me" :context-school-id="contextSchoolId" item-class="flex-row flex-md-row-reverse text-md-right" />
      </v-col>
      <v-col md="2" class="hidden-sm-and-down text-center">
        <div>
          <v-avatar rounded size="40" color="#F1F5F9">
            -
          </v-avatar>
          <v-avatar rounded size="40" color="#F1F5F9">
            -
          </v-avatar>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <FxTeamListItem v-if="event.eventType === EventType.FIXTURE" class="pl-0" :participant="opponent" :context-school-id="contextSchoolId" />
        <FxNonFixtureItem v-else :event-type="event.eventType" :name="event.name" />
      </v-col>
      <v-col md="2">
        <v-btn class="hidden-md-and-up" link block outlined :to="{ name: 'events-eventId', params: { eventId: event.id } }">
          Add Result
        </v-btn>
        <v-btn class="hidden-sm-and-down" link outlined :to="{ name: 'events-eventId', params: { eventId: event.id } }">
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

<style scoped lang="scss">
@import '~vuetify/src/styles/styles';

.custom-border-sm {
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    > :not(:nth-last-of-type(1)) {
      border-bottom: 1px var(--v-info-lighten4) solid;
    }
  }
}

.time {
  padding: 4px;
  border: 1px solid var(--v-info-lighten1);
  border-radius: 6px;
  width: 44px;
  height: 22px;
  margin: auto;
  line-height: 14px;
}

.custom-child-border:not(:nth-last-of-type(1)) {
  border-bottom: 1px solid var(--v-info-lighten4);
}
</style>

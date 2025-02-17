<template>
  <v-container :style="style" class="rounded">
    <v-row v-if="!compact">
      <v-col cols="12" class="border-bottom pt-1 pb-0">
        <v-list-item class="px-0">
          <v-list-item-avatar class="mr-2" tile size="24">
            <v-img :src="sport.icon" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-p2 neutral--text text--darken-3" v-text="sport.name" />
          </v-list-item-content>
          <v-spacer />
          <slot name="actions" />
        </v-list-item>
      </v-col>
    </v-row>
    <v-row v-if="compact">
      <v-col class="pa-0" style="margin-bottom: -41px">
        <slot name="actions" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" class="border-bottom">
        <FxTeamListItem class="pl-0" :participant="me" :context-school-id="contextSchoolId" item-class="flex-row flex-md-row-reverse text-md-right" />
      </v-col>
      <v-col cols="12" md="6" class="border-bottom">
        <FxTeamListItem v-if="event.eventType === EventType.FIXTURE" class="pl-0" :participant="opponent" :context-school-id="contextSchoolId" />
        <FxNonFixtureItem v-else :event-type="event.eventType" :name="event.name" />
      </v-col>
    </v-row>
    <v-row v-if="compact">
      <v-col cols="12" class="border-bottom pt-1 pb-0">
        <ListItem>
          <template #icon>
            <v-avatar size="22" tile>
              <v-img width="22" height="22" :src="sport.icon" />
            </v-avatar>
          </template>
          <template #title>
            {{ sport.name }}
          </template>
          <template #subtitle>
            Sport
          </template>
        </ListItem>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" lg="4" class="border-bottom border-right pt-1 pb-0">
        <ListItem>
          <template #icon>
            <v-icon>$vuetify.icons.calendar-1</v-icon>
          </template>
          <template #title>
            <FxDateFormat :date="event.date" />
          </template>
          <template #subtitle>
            Date
          </template>
        </ListItem>
      </v-col>
      <v-col cols="12" lg="4" class="border-bottom border-right pt-1 pb-0">
        <ListItem>
          <template #icon>
            <v-icon>$vuetify.icons.clock-1</v-icon>
          </template>
          <template #content>
            <div>
              <div v-if="me.meetTime" class="d-inline-block pr-8">
                <v-list-item-title class="text-p2 neutral--text text--darken-4">
                  {{ me.meetTime }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                  Meet Time
                </v-list-item-subtitle>
              </div>
              <div class="d-inline-block pr-8">
                <v-list-item-title class="text-p2 neutral--text text--darken-4">
                  {{ event.startTime }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                  Start Time
                </v-list-item-subtitle>
              </div>
              <div v-if="me.returnTime" class="d-inline-block pr-8">
                <v-list-item-title class="text-p2 neutral--text text--darken-4">
                  {{ me.returnTime }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                  Return Time
                </v-list-item-subtitle>
              </div>
              <div v-if="event.endTime" class="d-inline-block">
                <v-list-item-title class="text-p2 neutral--text text--darken-4">
                  {{ event.endTime }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                  End Time
                </v-list-item-subtitle>
              </div>
            </div>
          </template>
        </ListItem>
      </v-col>
      <v-col cols="12" lg="4" class="border-bottom pt-1 pb-0">
        <ListItem>
          <template #icon>
            <v-icon>$vuetify.icons.user-1</v-icon>
          </template>
          <template #title>
            <FxUserDisplayName :user="user" />
          </template>
          <template #subtitle>
            Lead Staff Member
          </template>
        </ListItem>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" class="border-bottom border-right pt-1 pb-0">
        <ListItem>
          <template #icon>
            <v-icon>$vuetify.icons.location-1</v-icon>
          </template>
          <template #title>
            <FxLocationLabel :event="event" :me="me" />
          </template>
          <template #subtitle>
            Location
          </template>
        </ListItem>
      </v-col>
      <v-col cols="12" sm="12" md="6" class="pt-1 pb-0">
        <ListItem v-if="!me.noNeedTransport">
          <template #icon>
            <v-icon>$vuetify.icons.transport-1</v-icon>
          </template>
          <template #content>
            <div>
              <div class="d-inline-block pr-8">
                <v-list-item-title class="text-p2 neutral--text text--darken-4">
                  {{ transportTo }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                  Transport To
                </v-list-item-subtitle>
              </div>
              <div class="d-inline-block">
                <v-list-item-title class="text-p2 neutral--text text--darken-4">
                  {{ transportFrom }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                  Transport From
                </v-list-item-subtitle>
              </div>
            </div>
          </template>
        </ListItem>
      </v-col>
    </v-row>
    <slot name="bottom" />
  </v-container>
</template>

<script>
import { TransportType, EventType } from '@/enum'
import ListItem from '@/components/FxEventItem/ListItem'
import FxLocationLabel from '@/components/FxEventItem/FxLocationLabel'

export default {
  name: 'FxEventItem',
  components: {
    FxLocationLabel,
    ListItem,
  },
  props: {
    event: {
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

    transportTo () {
      if (this.me.transportTo === TransportType.OTHER) {
        return this.me.transportToOther
      }

      if (this.me.transportTo) {
        return this.$t(`TRANSPORT_TO.${this.me.transportTo}`)
      }

      return ''
    },

    transportFrom () {
      if (this.me.transportFrom === TransportType.OTHER) {
        return this.me.transportFromOther
      }

      if (this.me.transportFrom) {
        return this.$t(`TRANSPORT_FROM.${this.me.transportFrom}`)
      }

      return ''
    },
  },

  async created () {
    this.sport = await this.$store.dispatch('api/sports/fetch', this.event.sportId)

    if (this.me.leadId) {
      this.user = await this.$store.dispatch('api/users/fetch', {
        schoolId: this.contextSchoolId,
        id: this.me.leadId,
      })
    }
  },
}
</script>

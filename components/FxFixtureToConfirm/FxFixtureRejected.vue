<template>
  <v-form ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col class="py-0">
          <FxTeamListItem v-if="opponent" class="px-0" :context-school-id="contextSchoolId" :participant="opponent" />
        </v-col>
        <v-col class="pt-2 pb-0">
          <v-alert dense class="mb-0 float-right">
            <span class="error--text text--darken-1 text-p1 font-weight-bold">Opponent Rejected</span>
          </v-alert>
        </v-col>
      </v-row>

      <v-row class="fx-lineitem">
        <v-col cols="12" class="pt-1 pb-0 px-6">
          <div class="d-inline-block">
            <ListItem>
              <template #icon>
                <v-icon>$vuetify.icons.calendar</v-icon>
              </template>
              <template #title>
                <FxDateFormat :date="event.date" />
              </template>
              <template #subtitle>
                Date
              </template>
            </ListItem>
          </div>

          <div class="d-inline-block">
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
          </div>

          <div class="d-inline-block">
            <ListItem>
              <template #icon>
                <v-icon>$vuetify.icons.list</v-icon>
              </template>
              <template #title>
                {{ event.age }}{{ event.ability }}
              </template>
              <template #subtitle>
                Age & Ability
              </template>
            </ListItem>
          </div>

          <div class="d-inline-block float-right mt-3">
            <v-btn outlined color="error darken-1" @click="remove">
              <v-icon>mdi-close</v-icon>Delete
            </v-btn>
            <v-btn outlined color="info darken-1" @click="dismiss">
              Dismiss
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row class="fx-lineitem">
        <v-col md="3" class="fx-columnitem pl-6">
          <ListItem>
            <template #icon>
              <v-icon>mdi-clock-outline</v-icon>
            </template>
            <template #title>
              {{ event.startTime }}
            </template>
            <template #subtitle>
              Start Time
            </template>
          </ListItem>
        </v-col>

        <v-col md="3" class="fx-columnitem">
          <ListItem>
            <template #icon>
              <v-icon>$vuetify.icons.tshirt</v-icon>
            </template>
            <template v-if="team" #title>
              {{ team.name }}
            </template>
            <template v-else-if="defaultTeam" #title>
              {{ defaultTeam }}
            </template>
            <template v-else #title>
              Select Team
            </template>
            <template #subtitle>
              Team
            </template>
          </ListItem>
        </v-col>

        <v-col md="3" class="fx-columnitem">
          <ListItem>
            <template #icon>
              <FxAvatar :size="24" :value="user.avatar" />
            </template>
            <template #title>
              {{ user.firstname }} {{ user.lastname }}
            </template>
            <template #subtitle>
              Assign To
            </template>
          </ListItem>
        </v-col>

        <v-col md="3" class="fx-columnitem pr-6">
          <ListItem>
            <template #icon>
              <v-icon>mdi-map-marker</v-icon>
            </template>
            <template v-if="location" #title>
              <span v-if="eventLocation">{{ eventLocation }} - </span>{{ location.name }}
            </template>
            <template v-else #title>
              Add Location
            </template>
            <template #subtitle>
              Location
            </template>
          </ListItem>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import ListItem from '~/components/FxEventItem/ListItem'
import FxAvatar from '~/components/FxAvatar'
import { EventStatus } from '@/enum'

export default {
  name: 'FxFixtureRejected',
  components: {
    ListItem,
    FxAvatar,
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
    conflicts: [],
    loading: false,
  }),

  computed: {
    defaultTeam () {
      if (!this.event.age || !this.event.ability) {
        return null
      }

      return `Under ${this.event.age.slice(1)}${this.event.ability}`
    },

    eventLocation () {
      const locations = {
        HOME: 'Home',
        NEUTRAL: 'Neutral',
        AWAY: 'Away',
      }
      return this.me.eventLocation ? locations[this.me.eventLocation] : ''
    },

    location () {
      return this.event.sportLocation
    },

    user () {
      return this.me.lead || {
        firstname: 'No Lead Staff Selected',
      }
    },

    team () {
      return this.me.team
    },

    sport () {
      return this.event.sport
    },
  },

  methods: {
    dismiss () {
      this.$store.dispatch('api/events/confirm', {
        status: EventStatus.DISMISSED,
        schoolId: this.contextSchoolId,
        eventId: this.event.id,
      }).then(() => {
        this.$emit('dismissed')
      }).catch(() => {
        this.$toast.error('Unknown Error')
      }).finally(() => {
        this.loading = false
      })
    },

    remove () {
      this.$store.dispatch('api/events/remove', {
        schoolId: this.contextSchoolId,
        id: this.event.id,
      }).then(() => {
        this.$emit('removed')
      }).catch(() => {
        this.$toast.error('Unknown Error')
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.fx-lineitem {
  border-bottom: 1px var(--v-info-lighten4) solid;
  &:last-child {
    border-bottom: none;
  }
}

.fx-columnitem {
  border-right: 1px var(--v-info-lighten4) solid;
  &:last-child {
    border-right: none;
  }
}
</style>

<template>
  <v-form ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col class="py-0">
          <FxTeamListItem v-if="opponent" class="px-0" :context-school-id="contextSchoolId" :participant="opponent" />
        </v-col>
        <v-col class="pt-2 pb-0">
          <v-alert v-if="!conflictsExist" dense class="mb-0 float-right">
            <v-icon color="success darken-2">
              mdi-checkbox-marked-circle-outline
            </v-icon>
            <span class="success--text text--darken-2 text-p1">No Event Conflict</span>
          </v-alert>
          <v-alert v-else dense class="mb-0 float-right">
            <v-icon color="error">
              mdi-alert-circle-outline
            </v-icon>
            <span class="error--text text--darken-1 text-p1 font-weight-bold">Event Conflict</span>
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
                <v-avatar size="22">
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
            <v-btn outlined color="error darken-1" @click="reject">
              <v-icon>mdi-close</v-icon>Reject
            </v-btn>
            <v-btn outlined color="success darken-1" @click="accept">
              <v-icon>mdi-check</v-icon>Confirm
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

          <FxMeetReturnTimeForm :value="me" @input="updateMe($event)" />
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

          <FxLeadSelectForm :value="me" @input="updateMe($event)" />
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

          <FxTeamSelectForm :value="me" :season-id="season.id" :sport-id="event.sportId" @input="updateMe($event)" />
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

          <FxLocationSelectForm v-if="canChangeLocation" :value="event" @input="updateEvent($event)" />
        </v-col>
      </v-row>

      <v-row v-if="conflictsExist" class="fx-lineitem">
        <v-col class="px-6 pt-5">
          <FxEventConflictItem
            v-for="conflict in conflicts"
            :key="conflict.eventId"
            v-model="override"
            :item="conflict"
            :context-school-id="contextSchoolId"
            hide-action
            class="mb-2"
            @updated="$root.$emit('conflict:updated')"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItem from '~/components/FxEventItem/ListItem'
import FxEventConflictItem from '~/components/FxEventForm/FxEventConflictItem'
import FxAvatar from '~/components/FxAvatar'
import FxMeetReturnTimeForm from '~/components/FxFixtureToConfirm/FxMeetReturnTimeForm'
import FxLeadSelectForm from '@/components/FxFixtureToConfirm/FxLeadSelectForm'
import FxTeamSelectForm from '@/components/FxFixtureToConfirm/FxTeamSelectForm'
import FxLocationSelectForm from '@/components/FxFixtureToConfirm/FxLocationSelectForm'
import { EventLocationType, EventStatus } from '@/enum'

export default {
  name: 'FxFixtureToConfirm',
  components: {
    FxLocationSelectForm,
    FxTeamSelectForm,
    FxLeadSelectForm,
    FxMeetReturnTimeForm,
    ListItem,
    FxEventConflictItem,
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
    override: [],
    isOpen: false,
    sport: {},
    user: {},
    location: null,
    team: null,

    confirmationData: {},
    loading: false,
  }),

  computed: {
    ...mapGetters({
      season: 'seasons/current',
    }),
    conflictsExist () {
      return this.conflicts.length > 0
    },

    defaultTeam () {
      if (!this.event.age || !this.event.ability) {
        return null
      }

      return `Under ${this.event.age.slice(1)}${this.event.ability}`
    },

    canChangeLocation () {
      return this.event.location === EventLocationType.OPPONENT_CONFIRMS && !this.me.creator
    },

    formData () {
      return {
        meetTime: this.me.meetTime,
        returnTime: this.me.returnTime,
        leadId: this.me.leadId,
        teamId: this.me.teamId,
        eventId: this.event.id,
        schoolId: this.contextSchoolId,
        sportLocationId: this.canChangeLocation ? this.event.sportLocationId : undefined,
      }
    },
    eventLocation () {
      const locations = {
        HOME: 'Home',
        NEUTRAL: 'Neutral',
        AWAY: 'Away',
      }
      return this.me.eventLocation ? locations[this.me.eventLocation] : ''
    },
  },

  watch: {
    event: {
      handler () {
        this.checkConflict()
        this.fetchLocation()
      },
      deep: true,
    },
    me: {
      handler () {
        this.checkConflict()
        this.fetchUser()
        this.fetchTeam()
      },
      deep: true,
    },
  },

  async created () {
    this.sport = await this.$store.dispatch('api/sports/fetch', this.event.sportId)

    await Promise.all([
      this.fetchUser(),
      this.fetchTeam(),
      this.fetchLocation(),
    ])

    await this.checkConflict()

    this.$root.$on('conflict:updated', this.checkConflict)
  },

  beforeDestroy () {
    this.$parent.$off('conflict:updated', this.checkConflict)
  },

  methods: {
    async checkConflict () {
      try {
        const { status, events } = await this.$store.dispatch('api/events/checkConflict', {
          schoolId: this.contextSchoolId,
          date: this.event.date,
          startTime: this.event.startTime,
          sportLocationId: this.event.sportLocationId,
          teamId: this.me.teamId,
          leadId: this.me.leadId,
        })

        this.conflicts = status === 'CONFLICT' ? events : []
      } catch {
        this.conflicts = []
      }
    },

    openForm () {
      this.isOpen = true
    },

    updateMe (value) {
      this.$emit('update:me', value)
    },

    updateEvent (value) {
      this.$emit('update:event', value)
    },

    async fetchUser () {
      if (this.me.leadId) {
        this.user = await this.$store.dispatch('api/users/fetch', {
          schoolId: this.contextSchoolId,
          id: this.me.leadId,
        })
      } else {
        this.user = {
          firstname: 'Select Lead Staff',
        }
      }
    },

    async fetchTeam () {
      if (this.me.teamId) {
        this.team = await this.$store.dispatch('api/teams/fetch', {
          schoolId: this.contextSchoolId,
          id: this.me.teamId,
        })
      }
    },

    async fetchLocation () {
      if (this.event.sportLocationId) {
        this.location = await this.$store.dispatch('api/locations/fetch', this.event.sportLocationId)
      } else {
        this.location = null
      }
    },

    accept () {
      const isValid = this.$refs.form.validate()

      if (!isValid) {
        return
      }

      this.loading = true

      this.$store.dispatch('api/events/confirm', {
        status: EventStatus.CONFIRMED,
        ...this.formData,
      })
        .then(() => {
          this.$emit('accepted')
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
        .finally(() => {
          this.loading = false
        })
    },

    reject () {
      this.$store.dispatch('api/events/confirm', {
        status: EventStatus.REJECTED,
        schoolId: this.contextSchoolId,
        eventId: this.event.id,
      }).then(() => {
        this.$emit('rejected')
      }).catch(() => {
        this.$toast.error('Unknown Error')
      })
        .finally(() => {
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

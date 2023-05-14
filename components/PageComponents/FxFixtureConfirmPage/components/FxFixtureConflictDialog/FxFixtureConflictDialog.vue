<template>
  <v-dialog v-model="isOpen" max-width="750">
    <v-form v-async-form :disabled="loading" @submit.prevent="save">
      <v-card class="conflict-dialog-card">
        <FxFixtureConflictDialogToolbar :has-conflicts="conflictExist" @click:close="close" />
        <v-skeleton-loader
          v-if="$fetchState.pending"
          type="list-item-avatar-two-line, actions"
        />

        <template v-else>
          <FxTeamListItem class="pl-6" :participant="event.opponent" :context-school-id="contextSchoolId" />

          <v-list class="child-border py-0">
            <div class="px-6">
              <ListItem class="d-inline-block">
                <template #icon>
                  <v-icon>$vuetify.icons.calendarRoundedOutline</v-icon>
                </template>
                <template #title>
                  <FxDateFormat :date="event.date" />
                </template>
                <template #subtitle>
                  Date
                </template>
              </ListItem>
              <ListItem class="d-inline-block">
                <template #icon>
                  <v-icon>$vuetify.icons.clockOutline</v-icon>
                </template>
                <template #content>
                  <div>
                    <div v-if="me.meetTime" class="d-inline-block pr-2">
                      <v-list-item-title class="text-p2 neutral--text text--darken-4">
                        {{ me.meetTime }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                        Meet Time
                      </v-list-item-subtitle>
                    </div>
                    <div class="d-inline-block pr-2">
                      <v-list-item-title class="text-p2 neutral--text text--darken-4">
                        {{ event.startTime }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                        Start Time
                      </v-list-item-subtitle>
                    </div>
                    <div v-if="me.returnTime" class="d-inline-block">
                      <v-list-item-title class="text-p2 neutral--text text--darken-4">
                        {{ me.returnTime }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="text-p1 neutral--text text--darken-2">
                        Return Time
                      </v-list-item-subtitle>
                    </div>
                  </div>
                </template>
              </ListItem>
            </div>

            <div class="px-6 d-flex">
              <ListItem>
                <template #icon>
                  <v-icon>$vuetify.icons.whistleAlert</v-icon>
                </template>
                <template #title>
                  {{ sport.name }}
                </template>
                <template #subtitle>
                  Sport
                </template>
              </ListItem>

              <ListItem>
                <template #icon>
                  <v-icon>$vuetify.icons.footballUniform</v-icon>
                </template>
                <template #title>
                  {{ me.team.name }}
                </template>
                <template #subtitle>
                  Team
                </template>
              </ListItem>
            </div>

            <div class="d-flex justify-space-between px-6 align-center">
              <ListItem>
                <template #icon>
                  <v-icon>$vuetify.icons.userOutline</v-icon>
                </template>
                <template v-if="isLeadEditable" #content>
                  <label for="lead">Lead Staff Member</label>
                  <FxUserSelect
                    id="lead"
                    v-model="formData.leadId"
                    :school-id="contextSchoolId"
                    placeholder="Select Lead Staff Member"
                    hide-details
                    @input="leadUpdateHandler"
                  />
                </template>
                <template #title>
                  <FxUserDisplayName :user="me.lead" />
                </template>
                <template #subtitle>
                  Lead Staff Member
                </template>
              </ListItem>

              <div>
                <FxFixtureConflictDialogAlert v-if="showLeadAlert">
                  Update Lead Staff
                </FxFixtureConflictDialogAlert>
              </div>
            </div>

            <div class="d-flex justify-space-between px-6 align-center">
              <ListItem>
                <template #icon>
                  <v-icon>$vuetify.icons.locationOutline</v-icon>
                </template>
                <template v-if="isSportLocationEditable" #content>
                  <label for="location">Event Location</label>
                  <FxSportLocationSelect
                    id="location"
                    v-model="formData.sportLocationId"
                    @input="sportLocationUpdateHandler"
                  />
                </template>
                <template #title>
                  <FxSportLocationLabel
                    :sport-location-id="event.sportLocationId"
                    :event-location-type="me.eventLocation"
                    :event-location-other="event.otherLocation"
                  />
                </template>
                <template #subtitle>
                  Location
                </template>
              </ListItem>

              <div>
                <FxFixtureConflictDialogAlert v-if="showSportLocationAlert">
                  Update Location
                </FxFixtureConflictDialogAlert>
              </div>
            </div>
          </v-list>
        </template>
        <v-card-actions class="px-6 pb-4">
          <template v-if="showUpdateButton">
            <v-menu offset-y>
              <template #activator="{ on, attrs }">
                <v-btn outlined color="neutral darken1" v-bind="attrs" v-on="on">
                  Actions
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="cancel">
                  <v-list-item-title>Cancel Event</v-list-item-title>
                </v-list-item>
                <v-list-item @click="postpone">
                  <v-list-item-title>Postpone</v-list-item-title>
                </v-list-item>
                <v-list-item @click="override">
                  <v-list-item-title>Override</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-spacer />
            <v-btn depressed color="primary" @click="save">
              Update
            </v-btn>
          </template>
          <template v-else>
            <v-btn depressed color="primary" @click="override">
              Override Conflict
            </v-btn>
            <v-spacer />
            <v-btn outlined @click="postpone">
              <span class="neutral--text text--darken-3">Postpone Event</span>
            </v-btn>
            <v-btn outlined color="error" @click="cancel">
              Cancel Event
            </v-btn>
          </template>
        </v-card-actions>
      </v-card>
    </v-form>

    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="{ on, attrs }" />
    </template>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import FxFixtureConflictDialogAlert from './FxFixtureConflictDialogAlert.vue'
import FxFixtureConflictDialogToolbar from './FxFixtureConflictDialogToolbar.vue'
import ListItem from '~/components/FxEventItem/ListItem.vue'
import { EventStatus } from '~/enum'

export default {
  name: 'FxFixtureConflictDialog',
  components: { FxFixtureConflictDialogToolbar, FxFixtureConflictDialogAlert, ListItem },
  props: {
    eventId: {
      type: String,
      required: true,
    },
    conflict: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    event: {},
    sport: {},
    formData: {},
    loading: false,
    leadIsAvailable: true,
    sportLocationIsAvailable: true,
    isOpen: false,
  }),

  async fetch () {
    const { sport, ...event } = await this.$store.dispatch('api/events/get', {
      schoolId: this.contextSchoolId,
      id: this.eventId,
    })

    this.event = event
    this.sport = sport

    this.formData = {
      leadId: this.event.me.leadId,
      sportLocationId: this.event.sportLocationId,
    }
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),

    me () {
      return this.event.me
    },

    opponent () {
      return this.event.opponent
    },

    conflictExist () {
      return !!(this.conflict.team || this.showLeadAlert || this.showSportLocationAlert)
    },

    isLeadEditable () {
      return !!this.conflict.lead
    },

    isSportLocationEditable () {
      return !!this.conflict.sportLocation
    },

    showLeadAlert () {
      return this.isLeadEditable &&
        ((this.formData.leadId === this.me?.leadId) || !this.leadIsAvailable)
    },

    showSportLocationAlert () {
      return this.isSportLocationEditable &&
        ((this.formData.sportLocationId === this.event?.sportLocationId) || !this.sportLocationIsAvailable)
    },

    showUpdateButton () {
      return (this.isSportLocationEditable || this.isLeadEditable) && !this.conflictExist
    },
  },

  methods: {
    save () {
      this.loading = true

      this.$store.dispatch('api/events/confirm', {
        schoolId: this.contextSchoolId,
        eventId: this.eventId,
        ...this.formData,
      }).then(() => {
        if (!this.conflictExist) {
          this.$emit('resolved')
          this.close()
        }
      }).catch(() => {
        this.$toast.error('Unknown Error')
      }).finally(() => {
        this.loading = false
      })
    },

    cancel () {
      if (!confirm('Do you want to cancel the Event?')) {
        return
      }

      this.loading = true

      this.$store.dispatch('api/events/confirm', {
        schoolId: this.contextSchoolId,
        eventId: this.eventId,
        status: EventStatus.CANCELLED,
      }).then(() => {
        this.$emit('resolved')
        this.close()
      }).catch(() => {
        this.$toast.error('Unknown Error')
      }).finally(() => {
        this.loading = false
      })
    },

    postpone () {
      if (!confirm('Do you want to postpone the Event?')) {
        return
      }

      this.loading = true

      this.$store.dispatch('api/events/confirm', {
        schoolId: this.contextSchoolId,
        eventId: this.eventId,
        status: EventStatus.POSTPONED,
      }).then(() => {
        this.$emit('resolved')
        this.close()
      }).catch(() => {
        this.$toast.error('Unknown Error')
      }).finally(() => {
        this.loading = false
      })
    },

    override () {
      if (!confirm('Do you want to override the Event?')) {
        return
      }

      this.$emit('resolved')
      this.close()
    },

    close () {
      this.isOpen = false
    },

    leadUpdateHandler (leadId) {
      this.$store.dispatch('api/validation/checkIfLeadIsAvailable', {
        leadId,
        date: this.event.date,
        fromTime: this.me.meetTime || this.event.startTime,
        toTime: this.me.returnTime || this.event.endTime,
      }).then(({ available }) => {
        this.leadIsAvailable = available
      })
    },

    sportLocationUpdateHandler (sportLocationId) {
      this.$store.dispatch('api/validation/checkIfSportLocationIsAvailable', {
        sportLocationId,
        date: this.event.date,
        fromTime: this.event.startTime,
        toTime: this.event.endTime,
      }).then(({ available }) => {
        this.sportLocationIsAvailable = available
      })
    },
  },
}
</script>
<style scoped>
.conflict-dialog-card {
  border: none!important;
}
</style>

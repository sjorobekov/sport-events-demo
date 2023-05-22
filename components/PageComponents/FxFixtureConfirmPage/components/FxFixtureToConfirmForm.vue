<template>
  <v-form ref="form" v-async-form :disabled="loading">
    <FxModernFormCard>
      <template #icon>
        <v-icon size="24">
          $vuetify.icons.teams-outline
        </v-icon>
      </template>
      <template #title>
        Team & Lead Staff
      </template>
      <template #content>
        Confirm the team and lead staff member for this event
      </template>

      <v-row>
        <v-col cols="12" md="6">
          <label for="team">Team</label>
          <v-autocomplete
            id="team"
            v-async-validate
            :async-rules="[$rule.required]"
            outlined
            dense
            :value="formData.teamId"
            :items="teams"
            item-text="name"
            item-value="id"
            placeholder="Select Team"
            @input="update('teamId', $event)"
          />
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="12" md="6" class="pt-0">
          <label for="lead">Lead Staff Member</label>
          <FxUserSelect
            id="lead"
            :async-rules="[$rule.required]"
            :school-id="contextSchoolId"
            :value="formData.leadId"
            placeholder="Select Lead Staff Member"
            @input="update('leadId', $event)"
          />
        </v-col>
      </v-row>
    </FxModernFormCard>

    <FxModernFormCard>
      <template #icon>
        <v-icon size="24">
          $vuetify.icons.calendarRoundedOutline
        </v-icon>
      </template>

      <template #title>
        Date & Time
      </template>

      <template #content>
        Confirm the event that this team is for
      </template>

      <v-row>
        <v-col cols="12" md="6">
          <label for="date">Date</label>
          <v-text-field
            id="date"
            :value="event.date"
            prepend-inner-icon="$vuetify.icons.calendarOutline"
            background-color="neutral lighten-3"
            outlined
            dense
            disabled
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" sm="6" md="6" lg="3">
          <label for="startTime">Start Time</label>

          <v-text-field
            id="startTime"
            :value="event.startTime"
            disabled
            outlined
            dense
            append-icon="mdi-clock-outline"
            background-color="info lighten-4"
          />
        </v-col>
        <v-col cols="6" sm="6" md="6" lg="3">
          <label for="meetTime">Meet Time</label>

          <FxTimePickerMenu
            id="meetTime"
            :async-rules="[$rule.required]"
            :value="formData.meetTime"
            @input="update('meetTime', $event)"
          />
        </v-col>
        <v-col cols="6" sm="6" md="6" lg="3">
          <label for="endTime">End Time</label>

          <v-text-field
            id="endTime"
            :value="event.endTime"
            disabled
            outlined
            dense
            append-icon="mdi-clock-outline"
            background-color="neutral lighten-3"
          />
        </v-col>

        <v-col cols="6" sm="6" md="6" lg="3">
          <label for="returnTime">Return Time</label>

          <FxTimePickerMenu
            id="returnTime"
            :async-rules="[$rule.required]"
            :value="formData.returnTime"
            @input="update('returnTime', $event)"
          />
        </v-col>
      </v-row>
    </FxModernFormCard>

    <FxModernFormCard>
      <template #icon>
        <v-icon size="24">
          $vuetify.icons.locationOutline
        </v-icon>
      </template>

      <template #title>
        Location
      </template>

      <template #content>
        Confirm the location for this event.
      </template>

      <v-row>
        <v-col cols="12" md="6">
          <label for="sportLocation">Sports Location</label>
          <v-autocomplete
            v-if="canChangeLocation"
            id="sportLocation"
            v-async-validate
            :async-rules="[$rule.required]"
            outlined
            dense
            :value="formData.sportLocationId"
            :items="sportLocations"
            item-text="name"
            item-value="id"
            placeholder="Select Sports Location"
            @input="update('sportLocationId', $event)"
          />

          <v-text-field
            v-else
            id="startTime"
            :value="selectedLocation"
            disabled
            outlined
            dense
            background-color="neutral lighten-3"
          />
        </v-col>
      </v-row>
    </FxModernFormCard>

    <FxModernFormCard>
      <template #icon>
        <v-icon size="24">
          $vuetify.icons.travel
        </v-icon>
      </template>
      <template #title>
        Transport
      </template>
      <template #content>
        Confirm the transport arrangements for this event
      </template>

      <v-row>
        <v-col>
          <v-checkbox
            :input-value="formData.noNeedTransport"
            label="This event doesn't need transport information"
            class="neutral--text mb-8"
            hide-details
            @change="update('noNeedTransport', $event)"
          />
          <v-expand-transition>
            <div v-if="!formData.noNeedTransport">
              <label>Transport to</label>
              <FxTransportToSelect
                :value="formData.transportTo"
                @input="update('transportTo', $event)"
              />
              <v-row>
                <v-col cols="12" sm="6" md="12" lg="6">
                  <v-expand-transition>
                    <div v-if="formData.transportTo === TransportType.OTHER">
                      <label for="transportToOther">Other</label>
                      <v-text-field
                        id="transportToOther"
                        outlined
                        dense
                        :value="formData.transportToOther"
                        placeholder="Enter Transport To"
                        @input="update('transportToOther', $event)"
                      />
                    </div>
                  </v-expand-transition>
                </v-col>
              </v-row>
              <label>Transport from</label>
              <FxTransportFromSelect
                :value="formData.transportFrom"
                @input="update('transportFrom', $event)"
              />
              <v-row>
                <v-col cols="12" sm="6" md="12" lg="6">
                  <v-expand-transition>
                    <div v-if="formData.transportFrom === TransportType.OTHER">
                      <label for="transportFromOther">Other</label>
                      <v-text-field
                        id="transportFromOther"
                        outlined
                        dense
                        :value="formData.transportFromOther"
                        placeholder="Enter Transport From"
                        @input="update('transportFromOther', $event)"
                      />
                    </div>
                  </v-expand-transition>
                </v-col>
              </v-row>
            </div>
          </v-expand-transition>
        </v-col>
      </v-row>
    </FxModernFormCard>

    <FxModernFormCard>
      <template #icon>
        <v-icon size="24">
          mdi-information-outline
        </v-icon>
      </template>
      <template #title>
        Further Information
      </template>
      <template #content>
        Confirm the transport arrangements for this event
      </template>

      <v-row>
        <v-col cols="12" md="9">
          <label for="info">Further Information</label>
          <v-textarea
            id="info"
            :value="formData.info"
            dense
            outlined
            placeholder="Enter any further information for this event."
            @input="update('info', $event)"
          />
        </v-col>
      </v-row>
    </FxModernFormCard>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventLocationType, TransportType } from '~/enum'

export default {
  name: 'FxFixtureToConfirmForm',
  props: {
    value: {
      type: Object,
      required: true,
    },
    event: {
      type: Object,
      required: true,
    },
    me: {
      type: Object,
      required: true,
    },
    opponent: {
      type: Object,
      required: true,
    },
    teams: {
      type: Array,
      required: true,
    },
    sportLocations: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    conflicts: [],
    override: [],
    isOpen: false,
    confirmationData: {},
    loading: false,
    TransportType,
    EventLocationType,
  }),

  computed: {
    ...mapGetters({
      season: 'seasons/current',
      contextSchoolId: 'context/schoolId',
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

    selectedLocation () {
      return !this.canChangeLocation ? `${this.eventLocation} - ${this.event.sportLocation.name}` : ''
    },

    formData () {
      return {
        ...(this.value || {}),
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

    location () {
      return this.event.sportLocation
    },

    team () {
      return this.me.team
    },

    sport () {
      return this.event.sport
    },
  },

  watch: {
    event: {
      handler () {
        this.checkConflict()
      },
      deep: true,
    },
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },

    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
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

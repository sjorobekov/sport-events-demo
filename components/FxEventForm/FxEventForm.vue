<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <FxSteppedFormCard v-if="!hideEventType">
      <template #number>
        1
      </template>
      <template #title>
        Event Type
      </template>
      <template #content>
        Select event type
      </template>

      <label>Select Event Type</label>

      <FxEventTypeSelect :value="eventForm.eventType" @input="updateEvent('eventType', $event)" />
    </FxSteppedFormCard>

    <FxSteppedFormCard>
      <template #number>
        2
      </template>
      <template #title>
        Select Team
      </template>
      <template #content>
        Select what team this event is for
      </template>

      <v-row>
        <v-col cols="6">
          <label for="sport">Sport</label>
          <v-autocomplete
            id="sport"
            v-async-validate
            :async-rules="[$rule.required]"
            outlined
            dense
            :value="eventForm.sportId"
            :items="sports"
            item-text="name"
            item-value="id"
            placeholder="Select Sport"
            @input="updateEvent('sportId', $event)"
          />
        </v-col>
        <v-col cols="6">
          <label for="team">Team</label>
          <v-autocomplete
            id="team"
            v-async-validate
            :async-rules="[$rule.required]"
            outlined
            dense
            :value="meForm.teamId"
            :items="filteredTeams"
            item-text="name"
            item-value="id"
            placeholder="Select Team"
            @input="selectTeam($event)"
          />
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col class="pt-0">
          <label for="lead">Lead Staff Member</label>
          <FxUserSelect
            id="lead"
            :school-id="schoolId"
            :value="meForm.leadId"
            placeholder="Select Lead Staff Member"
            @input="updateMe('leadId', $event)"
          />
        </v-col>
      </v-row>
    </FxSteppedFormCard>

    <FxSteppedFormCard v-if="eventForm.eventType === EventType.FIXTURE">
      <template #number>
        3
      </template>
      <template #title>
        Select Opponent
      </template>
      <template #content>
        Select what team this event is against
      </template>

      <label for="opponent">Opponent</label>
      <FxOpponentSelect
        dense
        :school-id="schoolId"
        :opponent-id="opponentForm.listedAsOpponentId"
        :opponent-school-id="opponentForm.schoolId"
        :async-rules="[$rule.required]"
        @update:opponentId="updateOpponent('listedAsOpponentId', $event)"
        @update:opponentSchoolId="updateOpponent('schoolId', $event)"
      />

      <v-row>
        <v-col class="py-0">
          <label for="gender">Gender</label>
          <FxGenderSelect
            id="gender"
            :value="eventForm.gender"
            :async-rules="[$rule.required]"
            @input="updateEvent('gender', $event)"
          />
        </v-col>
        <v-col class="py-0">
          <label for="age">Age Level</label>
          <FxAgeLevelSelect
            id="age"
            :value="eventForm.age"
            :async-rules="[$rule.required]"
            @input="updateEvent('age', $event)"
          />
        </v-col>
        <v-col class="py-0">
          <label for="ability">Ability Level</label>
          <FxAbilityLevelSelect
            id="ability"
            :value="eventForm.ability"
            :async-rules="[$rule.required]"
            @input="updateEvent('ability', $event)"
          />
        </v-col>
      </v-row>

      <label for="fixtureType">Fixture Type</label>
      <FxFixtureTypeSelect
        id="fixtureType"
        :value="eventForm.fixtureType"
        :async-rules="[$rule.required]"
        @input="updateEvent('fixtureType', $event)"
      />
    </FxSteppedFormCard>

    <FxSteppedFormCard v-else-if="eventForm.eventType === EventType.TOURNAMENT">
      <template #number>
        3
      </template>
      <template #title>
        Tournament Name
      </template>
      <template #content>
        Enter tournament name
      </template>

      <label for="tournament">Tournament Name</label>
      <v-text-field
        id="tournament"
        v-async-validate
        :value="eventForm.name"
        outlined
        dense
        placeholder="Tournament Name"
        :async-rules="[$rule.required]"
        maxlength="120"
        @input="updateEvent('name', $event)"
      />
    </FxSteppedFormCard>

    <FxSteppedFormCard v-else-if="eventForm.eventType === EventType.MULTI_EVENT">
      <template #number>
        3
      </template>
      <template #title>
        Event Name
      </template>
      <template #content>
        Enter event name
      </template>

      <label for="tournament">Event Name</label>
      <v-text-field
        id="tournament"
        v-async-validate
        :value="eventForm.name"
        outlined
        dense
        placeholder="Event Name"
        :async-rules="[$rule.required]"
        maxlength="120"
        @input="updateEvent('name', $event)"
      />
    </FxSteppedFormCard>

    <FxSteppedFormCard>
      <template #number>
        4
      </template>
      <template #title>
        Time & Date
      </template>
      <template #content>
        Select a Date and Time For this Event
      </template>
      <section v-if="eventForm.eventType === EventType.TRAINING">
        <v-row>
          <v-col class="d-flex">
            <span class="neutral--text text--darken-3 text-h5s mt-1">Recurring Event</span>
            <span class="neutral--text text--darken-3 text-h5s ml-7 mt-1" :class="{'font-weight-bold': !eventForm.repeats}">No</span>
            <v-switch
              id="repeats"
              v-model="eventForm.repeats"
              class="mt-0 ml-4"
              inset
            />
            <span class="neutral--text text--darken-3 text-h5s mt-1" :class="{'font-weight-bold': eventForm.repeats}">Yes</span>
          </v-col>
        </v-row>
        <v-row v-if="eventForm.repeats">
          <v-col class="d-flex">
            <span class="neutral--text text--darken-3 text-h5s mt-5 mr-5">Days</span>
            <div>
              <v-checkbox
                v-for="{ text, number } in weekdays"
                :key="number"
                v-model="selectedDays"
                :label="text"
                :value="number"
                hide-details
              />
            </div>
            <div>
              <v-checkbox
                v-for="{ text, number } in weekend"
                :key="number"
                v-model="selectedDays"
                :label="text"
                :value="number"
                hide-details
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <label for="date">Start Date</label>
            <v-menu ref="menu" offset-y :close-on-content-click="false" min-width="auto">
              <template #activator="{ on, attrs }">
                <v-text-field
                  id="date"
                  v-async-validate
                  :value="date"
                  prepend-inner-icon="$vuetify.icons.calendar-small"
                  readonly
                  outlined
                  dense
                  v-bind="attrs"
                  placeholder="DD-MM-YYYY"
                  :async-rules="[$rule.required]"
                  v-on="on"
                />
              </template>
              <v-date-picker
                ref="picker"
                :value="eventForm.date"
                @input="updateEvent('date', $event)"
                @change="$refs.menu.save($event)"
              />
            </v-menu>
          </v-col>
          <v-col v-if="eventForm.repeats">
            <label for="endDate">End Date</label>
            <v-menu ref="endMenu" offset-y :close-on-content-click="false" min-width="auto">
              <template #activator="{ on, attrs }">
                <v-text-field
                  id="endDate"
                  v-async-validate
                  :value="endDate"
                  prepend-inner-icon="$vuetify.icons.calendar-small"
                  readonly
                  outlined
                  dense
                  v-bind="attrs"
                  placeholder="DD-MM-YYYY"
                  :async-rules="[$rule.required]"
                  v-on="on"
                />
              </template>
              <v-date-picker
                ref="endPicker"
                :value="eventForm.endDate"
                @input="updateEvent('endDate', $event)"
                @change="$refs.endMenu.save($event)"
              />
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <label for="startTime">Start Time</label>
            <FxTimePickerMenu
              id="startTime"
              :async-rules="[$rule.required]"
              :value="eventForm.startTime"
              @input="updateEvent('startTime', $event)"
            />
          </v-col>
          <v-col>
            <label for="endTime">Finish Time</label>
            <FxTimePickerMenu
              id="endTime"
              :async-rules="[$rule.required]"
              :value="eventForm.endTime"
              @input="updateEvent('endTime', $event)"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="neutral--text text--darken-3 text-h5s">
              {{ $tc('page.FxEventForm.OCCURRENCES', repeats.length) }}
            </div>
            <div>
              <FxOccurrencesChips
                :params="repeatParams"
                :occurrences="repeats"
                @update:occurrences="updateRepeats($event)"
              />
            </div>
          </v-col>
        </v-row>
      </section>

      <section v-else>
        <label for="date">Date</label>
        <v-menu ref="menu" offset-y :close-on-content-click="false" min-width="auto">
          <template #activator="{ on, attrs }">
            <v-text-field
              id="date"
              v-async-validate
              :value="date"
              prepend-inner-icon="$vuetify.icons.calendar-small"
              readonly
              outlined
              dense
              v-bind="attrs"
              placeholder="DD-MM-YYYY"
              :async-rules="[$rule.required]"
              v-on="on"
            />
          </template>
          <v-date-picker
            ref="picker"
            :value="eventForm.date"
            class="disable-dbl-tap-zoom"
            @input="updateEvent('date', $event)"
            @change="$refs.menu.save($event)"
          />
        </v-menu>

        <v-row>
          <v-col cols="6" sm="3">
            <label for="startTime">Start Time</label>

            <FxTimePickerMenu
              id="startTime"
              :async-rules="[$rule.required]"
              :value="eventForm.startTime"
              @input="updateEvent('startTime', $event)"
            />
          </v-col>
          <v-col cols="6" sm="3">
            <label for="meetTime">Meet Time</label>

            <FxTimePickerMenu
              id="meetTime"
              :value="meForm.meetTime"
              @input="updateMe('meetTime', $event)"
            />
          </v-col>

          <v-col cols="6" sm="3">
            <label for="endTime">End Time</label>

            <FxTimePickerMenu
              id="endTime"
              :async-rules="[$rule.required]"
              :value="eventForm.endTime"
              @input="updateEvent('endTime', $event)"
            />
          </v-col>

          <v-col cols="6" sm="3">
            <label for="returnTime">Return Time</label>

            <FxTimePickerMenu
              id="returnTime"
              :async-rules="[$rule.required]"
              :value="meForm.returnTime"
              @input="updateMe('returnTime', $event)"
            />
          </v-col>
        </v-row>
      </section>
    </FxSteppedFormCard>

    <FxSteppedFormCard>
      <template #number>
        5
      </template>
      <template #title>
        Location
      </template>
      <template #content>
        Select Event Location
      </template>

      <label>Select Event Location</label>
      <FxEventLocationSelect
        :value="meForm.eventLocation"
        @input="updateMe('eventLocation', $event)"
      />
      <v-alert v-if="hasPortalAlertVisible" color="success" text class="alert fixturr-alert">
        <template #prepend>
          <div class="fixturr-alert-icon mr-3">
            <v-icon size="18" color="white" class="pa-1">
              mdi-checkbox-marked-circle-outline
            </v-icon>
          </div>
        </template>
        <div class="text-p2 font-weight-bold neutral--text text--darken-4">
          {{ opponentSchool.name }} also uses Fixturr.
        </div>
        <div class="text-p1 neutral--text text--darken-4">
          You can request they set the location for this event.
        </div>
      </v-alert>

      <label>Location</label>
      <FxEventLocationTypeSelect
        :value="eventForm.location"
        :show-opponent-confirms="hasPortalAlertVisible"
        @input="updateEvent('location', $event)"
      />

      <template v-if="eventForm.location === EventLocationType.SPORTS_LOCATIONS">
        <label for="sportLocation">Sports Location</label>
        <v-autocomplete
          id="sportLocation"
          v-async-validate
          :async-rules="[$rule.required]"
          outlined
          dense
          :value="eventForm.sportLocationId"
          :items="locations"
          item-text="name"
          item-value="id"
          placeholder="Select Sports Location"
          @input="updateEvent('sportLocationId', $event)"
        />
      </template>
      <template v-else-if="eventForm.location === EventLocationType.OTHER">
        <label for="locationOther">Search Locations</label>

        <GmapAutocomplete
          v-if="!eventForm.otherLocation"
          v-slot="{ attrs, listeners }"
          :set-fields-to="setFieldsTo"
          :component-restrictions="componentRestrictions"
          @place_changed="onPlaceChange"
        >
          <v-text-field
            id="locationOther"
            ref="input"
            v-async-validate
            :async-rules="[$rule.required]"
            placeholder="Enter Address"
            outlined
            dense
            v-bind="attrs"
            v-on="listeners"
          />
        </GmapAutocomplete>
        <v-text-field
          v-else
          outlined
          dense
          readonly
          :value="eventForm.otherLocation"
          append-icon="$vuetify.icons.pen"
          @click:append="editOtherLocation"
        />
      </template>
    </FxSteppedFormCard>

    <FxSteppedFormCard>
      <template #number>
        6
      </template>
      <template #title>
        Transport
      </template>
      <template #content>
        Enter Transport Information
      </template>

      <v-checkbox
        :input-value="meForm.noNeedTransport"
        label="This event doesn't need transport information"
        class="neutral--text"
        hide-details
        @change="updateMe('noNeedTransport', $event)"
      />
      <v-expand-transition>
        <div v-if="!meForm.noNeedTransport">
          <label>Transport to</label>
          <FxTransportToSelect
            :value="meForm.transportTo"
            @input="updateMe('transportTo', $event)"
          />
          <v-row>
            <v-col cols="12" sm="6" md="12" lg="6">
              <v-expand-transition>
                <div v-if="meForm.transportTo === TransportType.OTHER">
                  <label for="transportToOther">Other</label>
                  <v-text-field
                    id="transportToOther"
                    outlined
                    dense
                    :value="meForm.transportToOther"
                    placeholder="Enter Transport To"
                    @input="updateMe('transportToOther', $event)"
                  />
                </div>
              </v-expand-transition>
            </v-col>
          </v-row>
          <label>Transport from</label>
          <FxTransportFromSelect
            :value="meForm.transportFrom"
            @input="updateMe('transportFrom', $event)"
          />
          <v-row>
            <v-col cols="12" sm="6" md="12" lg="6">
              <v-expand-transition>
                <div v-if="meForm.transportFrom === TransportType.OTHER">
                  <label for="transportFromOther">Other</label>
                  <v-text-field
                    id="transportFromOther"
                    outlined
                    dense
                    :value="meForm.transportFromOther"
                    placeholder="Enter Transport From"
                    @input="updateMe('transportFromOther', $event)"
                  />
                </div>
              </v-expand-transition>
            </v-col>
          </v-row>
        </div>
      </v-expand-transition>
    </FxSteppedFormCard>

    <FxSteppedFormCard>
      <template #number>
        7
      </template>
      <template #title>
        Further Information
      </template>
      <template #content>
        Enter Other Information
      </template>

      <label for="info">Further Information</label>
      <v-textarea
        id="info"
        :value="meForm.info"
        dense
        outlined
        placeholder="Enter any further information for this event."
        @input="updateMe('info', $event)"
      />
    </FxSteppedFormCard>

    <v-container class="mt-4 mb-8">
      <v-row>
        <v-spacer />
        <v-btn outlined class="neutral--text text--darken-3" @click="$emit('cancel')">
          Cancel
        </v-btn>
        <v-btn
          depressed
          color="primary"
          dark
          class="ml-2"
          :loading="loading"
          @click="$emit('save')"
        >
          <v-icon>$vuetify.icons.save</v-icon>Save
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'
import FxSteppedFormCard from '@/components/FxSteppedFormCard'
import FxUserSelect from '@/components/FxUserSelect'
import FxEventLocationSelect from '@/components/FxEventForm/FxEventLocationSelect/FxEventLocationSelect'
import FxEventTypeSelect from '@/components/FxEventForm/FxEventTypeSelect/FxEventTypeSelect'
import FxGenderSelect from '@/components/FxGenderSelect'
import FxEventLocationTypeSelect from '@/components/FxEventForm/FxEventLocationTypeSelect/FxEventLocationTypeSelect'
import FxTransportToSelect from '@/components/FxEventForm/FxTransportToSelect/FxTransportToSelect'
import FxTransportFromSelect from '@/components/FxEventForm/FxTransportFromSelect/FxTransportFromSelect'
import FxFixtureTypeSelect from '@/components/FxEventForm/FxFixtureTypeSelect'
import { TransportType, EventLocationType, EventType, EventLocation } from '@/enum'
import FxOpponentSelect from '@/components/FxEventForm/FxOpponentSelect'
import FxOccurrencesChips from '@/components/FxEventForm/FxOccurrencesChips'

export default {
  name: 'FxEventForm',
  events: ['update:me', 'update:opponent', 'update:event'],
  components: {
    FxOpponentSelect,
    FxTransportFromSelect,
    FxTransportToSelect,
    FxEventLocationTypeSelect,
    FxEventLocationSelect,
    FxSteppedFormCard,
    FxUserSelect,
    FxEventTypeSelect,
    FxGenderSelect,
    FxFixtureTypeSelect,
    FxOccurrencesChips,
  },
  props: {
    value: {
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

    event: {
      type: Object,
      default: () => {},
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    hideEventType: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    repeats: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    teams: [],
    sports: [],
    TransportType,
    EventLocationType,
    EventType,
    opponentSchool: null,
    locations: [],
    weekdays: [
      { text: 'Monday', number: 1 },
      { text: 'Tuesday', number: 2 },
      { text: 'Wednesday', number: 3 },
      { text: 'Thursday', number: 4 },
      { text: 'Friday', number: 5 },
    ],
    weekend: [
      { text: 'Saturday', number: 6 },
      { text: 'Sunday', number: 7 },
    ],
    selectedDays: [],
  }),

  computed: {
    ...mapGetters({
      currentSeason: 'seasons/current',
      contextSchool: 'context/school',
      schoolId: 'context/schoolId',
    }),
    eventForm () {
      return this.event || {}
    },
    opponentForm () {
      return this.opponent || {}
    },
    meForm () {
      return this.me || {}
    },
    filteredTeams () {
      return this.teams.filter((team) => {
        return team.sportId === this.eventForm.sportId
      })
    },
    date () {
      return this.eventForm.date ? DateTime.fromISO(this.eventForm.date).toFormat('dd-MM-yyyy') : ''
    },
    endDate () {
      return this.eventForm.endDate ? DateTime.fromISO(this.eventForm.endDate).toFormat('dd-MM-yyyy') : ''
    },
    hasPortalAlertVisible () {
      return this.opponentSchool?.portal && this.meForm.eventLocation === EventLocation.AWAY
    },
    repeatParams () {
      return {
        repeats: this.eventForm.repeats,
        startDate: DateTime.fromISO(this.eventForm.date),
        endDate: DateTime.fromISO(this.eventForm.endDate),
        selectedDays: this.selectedDays,
      }
    },
    componentRestrictions () {
      return {
        country: this.contextSchool.country,
      }
    },

    setFieldsTo () {
      return ['address_components', 'name']
    },
  },

  async beforeMount () {
    this.teams = await this.$store.dispatch('api/teams/list', {
      schoolId: this.schoolId,
      params: { seasonId: this.currentSeason.id },
    })

    const sports = this.teams.map(team => team.sport)
    this.sports = [...new Map(sports.map(v => [v.id, v])).values()]

    this.locations = await this.$store.dispatch('api/locations/list', {
      schoolId: this.schoolId,
    })
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    selectTeam (teamId) {
      const team = this.teams.find(team => team.id === teamId) || {}
      this.$emit('update:me', {
        ...this.meForm,
        leadId: team.coachId,
        teamId,
        age: team.age,
        gender: team.gender,
        ability: team.ability,
      })

      this.$nextTick(() => {
        this.$emit('update:event', {
          ...this.eventForm,
          age: team.age,
          gender: team.gender,
          ability: team.ability,
        })
      })
    },
    updateEvent (key, value) {
      this.$emit('update:event', { ...this.eventForm, [key]: value })
    },
    updateMe (key, value) {
      const data = { ...this.meForm, [key]: value }
      if (key === 'noNeedTransport' && value) {
        data.transportTo = null
        data.transportFrom = null
        data.transportToOther = null
        data.transportFromOther = null
      }

      this.$emit('update:me', data)
    },
    updateOpponent (key, value) {
      this.$emit('update:opponent', { ...this.opponentForm, [key]: value })

      if (key === 'schoolId' && value) {
        this.$store.dispatch('api/schools/fetch', value).then((school) => {
          this.opponentSchool = school
        })
      }
    },
    updateRepeats (value) {
      this.$emit('update:repeats', value)
    },

    onPlaceChange ({ address_components: addressComponents, name }) {
      const { home, street, city } = this.getAddressObject(addressComponents)

      if (name) {
        this.updateEvent('otherLocation', `${name}, ${city}`)
        return
      }

      this.updateEvent('otherLocation', `${home} ${street}, ${city}`)
    },

    editOtherLocation () {
      this.updateEvent('otherLocation', null)
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },

    getAddressObject (addressComponents) {
      const ShouldBeComponent = {
        home: ['street_number'],
        postal_code: ['postal_code'],
        street: ['street_address', 'route'],
        region: [
          'administrative_area_level_1',
          'administrative_area_level_2',
          'administrative_area_level_3',
          'administrative_area_level_4',
          'administrative_area_level_5',
        ],
        city: [
          'locality',
          'sublocality',
          'sublocality_level_1',
          'sublocality_level_2',
          'sublocality_level_3',
          'sublocality_level_4',
        ],
        country: ['country'],
      }

      const address = {
        home: '',
        postal_code: '',
        street: '',
        region: '',
        city: '',
        country: '',
      }

      addressComponents.forEach((component) => {
        for (const shouldBe in ShouldBeComponent) {
          if (ShouldBeComponent[shouldBe].includes(component.types[0])) {
            if (shouldBe === 'country') {
              address[shouldBe] = component.short_name
            } else {
              address[shouldBe] = component.long_name
            }
          }
        }
      })
      return address
    },
  },
}
</script>
<style scoped>
.fixturr-alert {
  background-color: #edf7ef!important;
  border-color: #b6deb9!important;
}

.fixturr-alert-icon {
  background-color: #52AA59;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.1);
}
</style>

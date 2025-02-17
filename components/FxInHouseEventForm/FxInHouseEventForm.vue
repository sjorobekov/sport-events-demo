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

    <FxSteppedFormCard v-if="eventForm.eventType === InHouseEventType.ALL_HOUSES">
      <template #number>
        2
      </template>
      <template #title>
        Event Name
      </template>
      <template #content>
        Enter event name
      </template>
      <label for="eventName">Event Name</label>
      <v-text-field
        id="eventName"
        :value="eventForm.name"
        outlined
        dense
        placeholder="Event Name"
        maxlength="120"
        @input="updateEvent('name', $event)"
      />
    </FxSteppedFormCard>

    <FxSteppedFormCard v-if="eventForm.eventType === InHouseEventType.HOUSE_VS_HOUSE">
      <template #number>
        3
      </template>
      <template #title>
        Select House Team
      </template>
      <template #content>
        Select what team this event is for
      </template>

      <template v-for="(match, i) in matchItems">
        <div v-if="matchItems.length > 1" :key="`${i}-match`" class="text-line">
          <span class="neutral--text text--darken-3 text-h6s font-weight-bold">
            Match {{ parseToWords(i+1) }}
          </span>
        </div>
        <v-row :key="i">
          <v-col cols="6">
            <label for="home-team">House Team</label>
            <v-autocomplete
              id="home-team"
              v-async-validate
              :async-rules="[$rule.required]"
              outlined
              dense
              :value="match.homeTeamId"
              :items="filteredTeams"
              item-text="name"
              item-value="id"
              placeholder="Select House Team"
              @input="updateMatch(i, { homeTeamId: $event })"
            />
          </v-col>
          <v-col cols="6">
            <label for="away-team">House Team</label>
            <v-autocomplete
              id="away-team"
              v-async-validate
              :async-rules="[$rule.required]"
              outlined
              dense
              :value="match.awayTeamId"
              :items="filteredTeams"
              item-text="name"
              item-value="id"
              placeholder="Select House Team"
              @input="updateMatch(i, { awayTeamId: $event })"
            />
          </v-col>
        </v-row>
      </template>
      <v-row class="pa-3">
        <v-btn text block color="neutral darken-3" class="add-another-match-button" @click="add()">
          <v-icon>
            $vuetify.icons.add-all
          </v-icon> Add Another Match
        </v-btn>
      </v-row>
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

      <v-checkbox
        v-if="matchItems.length > 1"
        v-model="isSameDate"
        label="All Events Have The Same Time and Date"
        class="neutral--text mb-6"
        hide-details
      />
      <section v-for="(match, i) in matchItems" :key="i">
        <template v-if="!isSameDate || i === 0">
          <div v-if="matchItems.length > 1" class="text-line">
            <span class="neutral--text text--darken-3 text-h6s font-weight-bold">
              Match {{ parseToWords(i+1) }}
              <span v-if="match.homeTeamId">&nbsp;- {{ filteredTeamsMap.get(match.homeTeamId) }}</span>
              <span v-if="match.awayTeamId">&nbsp;vs {{ filteredTeamsMap.get(match.awayTeamId) }}</span>
            </span>
          </div>

          <label for="date">Date</label>
          <v-menu ref="menu" offset-y :close-on-content-click="false" min-width="auto">
            <template #activator="{ on, attrs }">
              <v-text-field
                id="date"
                v-async-validate
                :value="formatDate(match.date)"
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
              :value="match.date"
              @input="updateMatch(i, { date: $event })"
              @change="$refs.menu[i].save(event)"
            />
          </v-menu>

          <v-row>
            <v-col cols="4">
              <label for="startTime">Start Time</label>
              <FxTimePickerMenu
                id="startTime"
                :async-rules="[$rule.required]"
                :value="match.startTime"
                @input="updateMatch(i, { startTime: $event })"
              />
            </v-col>
            <v-col cols="4">
              <label for="finishTime">Finish Time</label>
              <FxTimePickerMenu
                id="finishTime"
                :value="match.finishTime"
                @input="updateMatch(i, { finishTime: $event })"
              />
            </v-col>
          </v-row>
        </template>
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

      <v-checkbox
        v-if="matchItems.length > 1"
        v-model="isSameLocation"
        label="All Events Have The Same Location"
        class="neutral--text mb-6"
        hide-details
      />
      <div v-for="(match, i) in matchItems" :key="i">
        <template v-if="!isSameLocation || i === 0">
          <div v-if="matchItems.length > 1" class="text-line">
            <span class="neutral--text text--darken-3 text-h6s font-weight-bold">
              Match {{ parseToWords(i+1) }}
              <span v-if="match.homeTeamId">&nbsp;- {{ filteredTeamsMap.get(match.homeTeamId) }}</span>
              <span v-if="match.awayTeamId">&nbsp;vs {{ filteredTeamsMap.get(match.awayTeamId) }}</span>
            </span>
          </div>

          <label>Location</label>
          <FxInHouseEventLocationTypeSelect
            :value="match.location"
            @input="updateMatch(i, { location: $event })"
          />

          <template v-if="match.location === EventLocationType.SPORTS_LOCATIONS">
            <label :for="`sportLocation-${match.number}`">Sports Location</label>
            <v-autocomplete
              :id="`sportLocation-${match.number}`"
              v-async-validate
              :async-rules="[$rule.required]"
              outlined
              dense
              :value="match.sportLocationId"
              :items="locations"
              item-text="name"
              item-value="id"
              placeholder="Select Sports Location"
              @input="updateMatch(i, { sportLocationId: $event })"
            />
          </template>
          <template v-else-if="match.location === EventLocationType.OTHER">
            <label :for="`locationOther-${match.number}`">Sports Location</label>
            <v-text-field
              :id="`locationOther-${match.number}`"
              v-async-validate
              dense
              outlined
              placeholder="Enter Address"
              :async-rules="[$rule.required]"
              :value="match.otherLocation"
              @input="updateMatch(i, { otherLocation: $event })"
            />
          </template>
        </template>
      </div>
    </FxSteppedFormCard>

    <FxSteppedFormCard>
      <template #number>
        6
      </template>
      <template #title>
        Further Information
      </template>
      <template #content>
        Enter Other Information
      </template>

      <v-row class="mt-0">
        <v-col class="pt-0">
          <label for="lead">Lead Staff Member</label>
          <FxUserSelect
            id="lead"
            :school-id="schoolId"
            :value="eventForm.leadId"
            :async-rules="[$rule.required]"
            placeholder="Select Lead Staff Member"
            @input="updateEvent('leadId', $event)"
          />
        </v-col>
      </v-row>

      <label for="info">Further Information</label>
      <v-textarea
        id="info"
        :value="eventForm.info"
        dense
        outlined
        placeholder="Enter any further information for this event."
        @input="updateEvent('info', $event)"
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
import tap from 'lodash/tap'
import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'
import numberToWords from 'number-to-words'
import FxSteppedFormCard from '@/components/FxSteppedFormCard'
import FxEventTypeSelect from '@/components/FxInHouseEventForm/FxEventTypeSelect/FxEventTypeSelect'
import FxInHouseEventLocationTypeSelect from '@/components/FxInHouseEventForm/FxEventLocationTypeSelect/FxInHouseEventLocationTypeSelect'
import { EventLocationType, InHouseEventType } from '@/enum'

export default {
  name: 'FxInHouseEventForm',
  events: ['update:matches', 'update:event'],
  components: {
    FxInHouseEventLocationTypeSelect,
    FxSteppedFormCard,
    FxEventTypeSelect,
  },
  props: {
    event: {
      type: Object,
      default: () => {},
    },

    matches: {
      type: Array,
      default: () => [],
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

    schoolId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    teams: [],
    EventLocationType,
    InHouseEventType,
    opponentSchool: null,
    locations: [],
    isSameDate: false,
    isSameLocation: false,
  }),

  computed: {
    ...mapGetters({
      currentSeason: 'seasons/current',
    }),
    eventForm () {
      return this.event || {}
    },
    matchItems () {
      return this.matches || {}
    },
    filteredTeams () {
      return this.teams.filter((team) => {
        return team.sportId === this.eventForm.sportId
      })
    },
    filteredTeamsMap () {
      return new Map(this.filteredTeams.map(item => [item.id, item.name]))
    },
  },

  async beforeMount () {
    this.teams = await this.$store.dispatch('api/inHouseTeams/list', {
      schoolId: this.schoolId,
    })

    this.locations = await this.$store.dispatch('api/locations/list', {
      schoolId: this.schoolId,
    })
  },

  methods: {
    validateAsync () {
      return this.$refs.form.validateAsync()
    },
    updateEvent (key, value) {
      if (value === InHouseEventType.ALL_HOUSES) {
        this.$emit('update:matches', [this.matchItems[0]])
      }
      this.$emit('update:event', { ...this.eventForm, [key]: value })
    },

    updateMatch (key, value) {
      const updatedKey = Object.keys(value)[0]
      const sameDate = this.isSameDate && ['date', 'startTime', 'finishTime'].includes(updatedKey)
      const sameLocation = this.isSameLocation && ['sportLocationId', 'otherLocation'].includes(updatedKey)
      if (sameDate || sameLocation) {
        this.$emit('update:matches', cloneDeep(this.matchItems).map(item => ({ ...item, ...value })))
      } else {
        this.$emit('update:matches', tap(cloneDeep(this.matchItems), (v) => {
          return set(v, key, { ...this.matchItems[key], ...value })
        }))
      }
    },

    add () {
      this.$emit('update:matches', tap(cloneDeep(this.matchItems), v => v.push({
        number: this.matchItems.length + 1,
        homeTeamId: '',
        awayTeamId: '',
        location: EventLocationType.SPORTS_LOCATIONS,
      })))
    },

    formatDate (date) {
      return date ? DateTime.fromISO(date).toFormat('dd-MM-yyyy') : ''
    },

    parseToWords (num) {
      return numberToWords.toWords(num)
    },
  },
}
</script>
<style scoped>
.v-btn:before {
  opacity: 0!important
}
.add-another-match-button:hover {
  box-shadow: none!important;
  color: var(--v-primary-base)!important;
}
.text-line > span {
  display: flex;
  flex-direction: row;
  text-transform: capitalize;
}
.text-line > span:after {
  margin: auto;
  margin-left: 10px;
  content: "";
  flex: 1 1;
  border-bottom: 1px solid;
}
</style>

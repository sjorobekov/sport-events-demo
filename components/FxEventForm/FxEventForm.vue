<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <FxSteppedFormCard>
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

      <FxEventTypeSelect />
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
            :value="formData.sportId"
            :items="sports"
            item-text="name"
            item-value="id"
            placeholder="Select Sport"
            @input="update('sportId', $event)"
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
            :value="formData.teamId"
            :items="filteredTeams"
            item-text="name"
            item-value="id"
            placeholder="Select Team"
            @input="update('teamId', $event)"
          />
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col class="pt-0">
          <label for="user">Lead Staff Member</label>
          <FxUserSelect
            id="user"
            :school-id="formData.schoolId"
            :value="formData.userId"
            placeholder="Select Lead Staff Member"
            @input="update('userId', $event)"
          />
        </v-col>
      </v-row>
    </FxSteppedFormCard>

    <FxSteppedFormCard>
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
      <v-autocomplete id="opponent" prepend-inner-icon="mdi-magnify" outlined dense />

      <v-row>
        <v-col class="py-0">
          <label for="gender">Gender</label>
          <FxGenderSelect
            id="gender"
            :value="formData.gender"
            :async-rules="[$rule.required]"
            @input="update('gender', $event)"
          />
        </v-col>
        <v-col class="py-0">
          <label for="age">Age Level</label>
          <FxAgeLevelSelect
            id="age"
            :value="formData.age"
            :async-rules="[$rule.required]"
            @input="update('age', $event)"
          />
        </v-col>
        <v-col class="py-0">
          <label for="ability">Ability Level</label>
          <FxAbilityLevelSelect
            id="ability"
            :value="formData.ability"
            :async-rules="[$rule.required]"
            @input="update('ability', $event)"
          />
        </v-col>
      </v-row>

      <label for="fixtureType">Fixture Type</label>
      <FxFixtureTypeSelect
        id="fixtureType"
        :value="formData.fixtureType"
        :async-rules="[$rule.required]"
        @input="update('fixtureType', $event)"
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

      <label for="date">Date</label>
      <v-menu ref="menu" offset-y :close-on-content-click="false">
        <template #activator="{ on, attrs }">
          <v-text-field
            id="date"
            v-async-validate
            :value="formData.date"
            prepend-inner-icon="$vuetify.icons.calendarOutline"
            readonly
            outlined
            dense
            v-bind="attrs"
            placeholder="YYYY-MM-DD"
            :async-rules="[$rule.required]"
            v-on="on"
          />
        </template>
        <v-date-picker
          ref="picker"
          :value="formData.date"
          @input="update('date', $event)"
          @change="$refs.menu.save($event)"
        />
      </v-menu>

      <v-row>
        <v-col cols="4">
          <label for="startTime">Start Time</label>
          <v-text-field
            id="startTime"
            v-async-validate
            type="time"
            dense
            outlined
            placeholder="HH:MM"
            :async-rules="[$rule.required]"
            :value="formData.startTime"
            @input="update('startTime', $event)"
          />
        </v-col>
        <v-col cols="4">
          <label for="meetTime">Meet Time</label>
          <v-text-field
            id="meetTime"
            v-async-validate
            type="time"
            dense
            outlined
            placeholder="HH:MM"
            :async-rules="[$rule.required]"
            :value="formData.meetTime"
            @input="update('meetTime', $event)"
          />
        </v-col>
        <v-col cols="4">
          <label for="returnTime">Return Time</label>
          <v-text-field
            id="returnTime"
            v-async-validate
            type="time"
            dense
            outlined
            placeholder="HH:MM"
            :async-rules="[$rule.required]"
            :value="formData.returnTime"
            @input="update('returnTime', $event)"
          />
        </v-col>
      </v-row>
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
        :value="formData.eventLocation"
        @input="update('eventLocation', $event)"
      />

      <v-alert color="#ECFDF5" icon="mdi-checkbox-marked-circle-outline" class="success--text text--darken-2">
        <div class="text-p1 font-weight-bold">
          British International School Hanoi also uses Fixturr.
        </div>
        <div class="text-p1">
          You can request they set the location for this event.
        </div>
      </v-alert>

      <label>Select Location</label>
      <FxEventLocationTypeSelect
        :value="formData.location"
        @input="update('location', $event)"
      />
    </FxSteppedFormCard>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import FxSteppedFormCard from '@/components/FxSteppedFormCard'
import FxUserSelect from '@/components/FxUserSelect'
import FxEventLocationSelect from '@/components/FxEventLocationSelect/FxEventLocationSelect'
import FxEventTypeSelect from '@/components/FxEventTypeSelect/FxEventTypeSelect'
import FxGenderSelect from '@/components/FxGenderSelect'
import FxEventLocationTypeSelect from '@/components/FxEventLocationTypeSelect/FxEventLocationTypeSelect'

export default {
  name: 'FxEventForm',
  components: {
    FxEventLocationTypeSelect,
    FxEventLocationSelect,
    FxSteppedFormCard,
    FxUserSelect,
    FxEventTypeSelect,
    FxGenderSelect,
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    teams: [],
    sports: [],
  }),

  computed: {
    ...mapGetters({
      school: 'admin/page/school/school',
      currentSeason: 'seasons/current',
    }),
    formData () {
      return {
        ...(this.value || { name: '', address: '' }),
      }
    },
    filteredTeams () {
      return this.teams.filter((team) => {
        return team.sportId === this.formData.sportId
      })
    },
  },

  async beforeMount () {
    this.teams = await this.$store.dispatch('api/teams/list', {
      schoolId: this.formData.schoolId,
      params: { seasonId: this.currentSeason.id },
    })

    const sports = this.teams.map(team => team.sport)
    this.sports = [...new Map(sports.map(v => [v.id, v])).values()]
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

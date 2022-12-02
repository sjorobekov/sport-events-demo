<template>
  <v-form ref="form" v-async-form :disabled="disabled">
    <v-row>
      <v-col>
        <label for="homeTeam">Home Team</label>
        <v-select
          id="homeTeam"
          v-model="homeTeam"
          outlined
          dense
          :items="items"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <label for="sportLocation">Location</label>
        <v-autocomplete
          id="sportLocation"
          v-async-validate
          :async-rules="[$rule.required]"
          outlined
          dense
          :value="formData.sportLocationId"
          :items="locations"
          item-text="name"
          item-value="id"
          placeholder="Select Sports Location"
          @input="update('sportLocationId', $event)"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { EventLocation } from '@/enum'

export default {
  name: 'FxEventLocationForm',
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
    EventLocation,
    leftLocations: [],
    rightLocations: [],
  }),

  computed: {
    formData () {
      return {
        ...(this.value || {}),
      }
    },

    items () {
      return [
        ...this.formData.participants.map((participant) => {
          return { value: participant.id, text: participant.school.name }
        }),
        { value: EventLocation.NEUTRAL, text: 'Neutral' },
      ]
    },

    locations () {
      const [left, right] = this.formData.participants

      if (this.homeTeam === left.id) {
        return this.leftLocations
      } else if (this.homeTeam === right.id) {
        return this.rightLocations
      }

      return [
        ...this.leftLocations,
        ...this.rightLocations,
      ]
    },

    homeTeam: {
      get () {
        if (this.formData.participants[0].eventLocation === EventLocation.HOME) {
          return this.formData.participants[0].id
        }

        if (this.formData.participants[1].eventLocation === EventLocation.HOME) {
          return this.formData.participants[1].id
        }

        return EventLocation.NEUTRAL
      },
      set (val) {
        const data = cloneDeep(this.formData)

        const [left, right] = data.participants

        if (val === left.id) {
          left.eventLocation = EventLocation.HOME
          right.eventLocation = EventLocation.AWAY
          data.sportLocationId = this.leftLocations[0]?.id
        } else if (val === right.id) {
          left.eventLocation = EventLocation.AWAY
          right.eventLocation = EventLocation.HOME
          data.sportLocationId = this.rightLocations[0]?.id
        } else {
          left.eventLocation = EventLocation.NEUTRAL
          right.eventLocation = EventLocation.NEUTRAL
          data.sportLocationId = null
        }

        this.$emit('input', data)
      },
    },
  },

  async created () {
    const schoolIds = this.formData.participants.map(a => a.schoolId)

    const [leftLocations, rightLocations] = await Promise.all(schoolIds.map((schoolId) => {
      return this.$store.dispatch('api/locations/list', { schoolId })
    }))

    this.leftLocations = leftLocations
    this.rightLocations = rightLocations
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

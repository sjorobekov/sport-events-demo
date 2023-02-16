<template>
  <div>
    <v-row class="hidden-lg-and-up">
      <v-col class="mb-2">
        <FxCalendarSportFilter
          :value="formData.sports"
          :items="sports"
          @input="update('sports', $event)"
        />
      </v-col>
    </v-row>

    <div class="d-flex flex-column flex-md-row flex-md-wrap" style="gap: 8px;">
      <FxCalendarStaffFilter
        :value="formData.leadIds"
        :items="leadIds"
        @input="update('leadIds', $event)"
      />
      <FxCalendarEventFilter
        :value="formData.eventTypes"
        :items="eventTypes"
        :in-house-filter="containsInHouseEvents"
        @input="update('eventTypes', $event)"
      />
      <FxCalendarOpponentFilter
        :value="formData.opponentIds"
        :items="opponentIds"
        @input="update('opponentIds', $event)"
      />
      <FxCalendarAgeFilter
        :value="formData.ageGroups"
        :items="ageGroups"
        @input="update('ageGroups', $event)"
      />
      <FxCalendarLocationFilter
        :value="formData.locations"
        @input="update('locations', $event)"
      />
      <FxCalendarStatusFilter
        v-if="isLoggedIn"
        :value="formData.privacy"
        @input="update('privacy', $event)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxCalendarSportFilter from './FxCalendarSportFilter'
import FxCalendarStaffFilter from './FxCalendarStaffFilter'
import FxCalendarEventFilter from './FxCalendarEventFilter'
import FxCalendarOpponentFilter from './FxCalendarOpponentFilter'
import FxCalendarAgeFilter from './FxCalendarAgeFilter'
import FxCalendarLocationFilter from './FxCalendarLocationFilter'
import FxCalendarStatusFilter from './FxCalendarStatusFilter'

export default {
  name: 'FxCalendarFilter',
  components: {
    FxCalendarStatusFilter,
    FxCalendarLocationFilter,
    FxCalendarAgeFilter,
    FxCalendarOpponentFilter,
    FxCalendarEventFilter,
    FxCalendarStaffFilter,
    FxCalendarSportFilter,
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    sports: {
      type: Array,
      default: () => [],
    },
    leadIds: {
      type: Array,
      default: () => [],
    },
    eventTypes: {
      type: Array,
      default: () => [],
    },
    containsInHouseEvents: {
      type: Boolean,
      default: false,
    },
    opponentIds: {
      type: Array,
      default: () => [],
    },
    ageGroups: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'context/isLoggedIn',
    }),
    formData () {
      return {
        ...(this.value || {}),
      }
    },
  },

  methods: {
    update (key, value) {
      this.$emit('input', { ...this.formData, [key]: value })
    },

    clearAll () {
      this.$emit('input', {
        ...this.formData,
        sports: [],
        leadIds: [],
        eventTypes: [],
        opponentIds: [],
        ageGroups: [],
        locations: [],
        privacy: [],
      })
    },
  },
}
</script>

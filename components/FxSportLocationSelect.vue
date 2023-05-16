<template>
  <v-autocomplete
    :id="id"
    v-async-validate
    :async-rules="asyncRules"
    outlined
    dense
    :value="value"
    :items="locations"
    :hide-details="hideDetails"
    item-text="name"
    item-value="id"
    :class="className"
    placeholder="Select Sports Location"
    @input="$emit('input', $event)"
  >
    <template #selection="{ item }">
      {{ item.name }}
    </template>
  </v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FxSportLocationSelect',

  props: {
    id: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
    asyncRules: {
      type: Array,
      default: () => [],
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    locations: [],
  }),

  async fetch () {
    this.locations = await this.$store.dispatch('api/locations/list', {
      schoolId: this.schoolId,
    })
  },

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },
}
</script>

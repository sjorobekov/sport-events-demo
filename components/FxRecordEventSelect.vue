<template>
  <v-autocomplete
    :id="id"
    outlined
    dense
    :value="value"
    :items="events"
    item-text="name"
    item-value="id"
    :placeholder="placeholder"
    :clearable="clearable"
    @input="$emit('input', $event)"
  >
    <template v-if="icon" #prepend-inner>
      <v-icon v-text="icon" />
    </template>
  </v-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FxRecordEventSelect',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Event',
    },
    value: {
      type: String,
      default: undefined,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: 'mdi-clipboard-outline',
    },
  },
  data: () => ({
    events: [],
  }),

  async fetch () {
    this.events = await this.$store.dispatch('api/sportsRecordEvents/list', { schoolId: this.schoolId })
  },

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },
}
</script>

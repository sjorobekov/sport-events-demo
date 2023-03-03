<template>
  <div>
    <v-chip
      v-for="item in occurrences"
      :key="item.value"
      color="info"
      outlined
      dark
      class="ma-1"
    >
      {{ item.text }}
    </v-chip>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FxOccurrencesChips',
  props: {
    repeats: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: String,
      default: undefined,
    },
    endDate: {
      type: String,
      default: undefined,
    },
    selectedDays: {
      type: Array,
      default: () => {},
    },
  },

  computed: {
    ...mapGetters({
      occurrences: 'page/event/occurrences',
    }),
  },

  watch: {
    $props: {
      handler () {
        this.$store.dispatch('page/event/calculateOccurrences', {
          repeats: this.repeats,
          startDate: DateTime.fromISO(this.startDate),
          endDate: DateTime.fromISO(this.endDate),
          selectedDays: this.selectedDays,
        })
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    ...mapActions({
      calculateOccurrences: 'page/event/calculateOccurrences',
    }),
  },
}
</script>

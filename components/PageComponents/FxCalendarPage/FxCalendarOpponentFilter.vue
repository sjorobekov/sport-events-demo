<template>
  <v-select
    dense
    outlined
    hide-details
    multiple
    placeholder="Opponent"
    prepend-inner-icon="mdi-filter-outline"
    :items="opponents"
    :item-text="name"
    item-value="id"
    chips
    :value="value"
    deletable-chips
    @input="$emit('input', $event)"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FxCalendarOpponentFilter',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    opponents: [],
  }),
  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },
  watch: {
    items: {
      deep: true,
      async handler (val) {
        this.opponents = await Promise.all(val.filter(id => !!id).map((id) => {
          return this.$store.dispatch('api/opponents/fetch', {
            id,
            schoolId: this.schoolId,
          })
        }))
      },
    },
  },
  methods: {
    name (item) {
      return item.opponentSchool ? item.opponentSchool.name : item.name
    },
  },
}
</script>

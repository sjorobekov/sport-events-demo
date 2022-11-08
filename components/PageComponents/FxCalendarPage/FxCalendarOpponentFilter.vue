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
    background-color="white"
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

  async fetch () {
    await this.fetchItems()
  },

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },
  watch: {
    items: {
      deep: true,
      async handler () {
        await this.fetchItems()
      },
    },
  },

  methods: {
    name (item) {
      return item.opponentSchool ? item.opponentSchool.name : item.name
    },

    async fetchItems () {
      this.opponents = await Promise.all(this.items.filter(id => !!id).map((id) => {
        return this.$store.dispatch('api/opponents/fetch', {
          id,
          schoolId: this.schoolId,
        })
      }))
    },
  },
}
</script>

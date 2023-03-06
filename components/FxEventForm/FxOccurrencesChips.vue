<template>
  <div>
    <v-chip
      v-for="(item, index) in items"
      :key="index"
      color="info"
      outlined
      dark
      class="ma-1"
      @click="update(items)"
    >
      {{ item.text }}
    </v-chip>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FxOccurrencesChips',
  props: {
    params: {
      type: Object,
      default: () => {},
    },
    occurrences: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    items: [],
  }),

  watch: {
    params: {
      async handler (value) {
        this.items = await this.calculateOccurrences(value)
        this.update(this.items)
      },
      deep: true,
    },
  },

  methods: {
    ...mapActions({
      calculateOccurrences: 'api/events/calculateOccurrences',
    }),
    update (value) {
      this.$emit('update:occurrences', value)
    },
  },
}
</script>

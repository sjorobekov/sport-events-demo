<template>
  <v-select
    dense
    outlined
    hide-details
    multiple
    placeholder="Opponent"
    prepend-inner-icon="$vuetify.icons.school-small"
    :items="opponents"
    :item-text="name"
    item-value="id"
    :value="value"
    deletable-chips
    background-color="white"
    :class="{ 'staff-filter': value.length > 0 }"
    @input="$emit('input', $event)"
  >
    <template #selection="{ index }">
      <v-chip v-show="index === 0">
        {{ value.length }} selected <v-icon size="18" @click.stop="$emit('input', [])">
          mdi-close-circle
        </v-icon>
      </v-chip>
    </template>
  </v-select>
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

<style scoped>
.staff-filter /deep/ input {
  display: none;
}
</style>

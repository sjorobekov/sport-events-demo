<template>
  <v-autocomplete
    :id="id"
    outlined
    dense
    :value="value"
    :items="categories"
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
  name: 'FxRecordCategorySelect',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Category',
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
      default: 'mdi-filter-outline',
    },
  },
  data: () => ({
    categories: [],
  }),

  async fetch () {
    this.categories = await this.$store.dispatch('api/sportsRecordCategories/list', { schoolId: this.schoolId })
  },

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },
}
</script>

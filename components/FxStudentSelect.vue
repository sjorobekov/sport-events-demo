<template>
  <v-autocomplete
    :id="id"
    outlined
    dense
    :value="value"
    :items="items"
    :item-text="getItemText"
    item-value="id"
    :placeholder="placeholder"
    :loading="loading"
    multiple
    prepend-inner-icon="mdi-magnify"
    persistent-placeholder
    @input="$emit('input', $event)"
  >
    <template #item="{ item, attrs }">
      <FxStudentListItem :student="item" :value="item">
        <template #action>
          <v-btn color="info darken-1" outlined>
            <template v-if="attrs.inputValue">
              <v-icon>mdi-check</v-icon> Added
            </template>
            <template v-else>
              <v-icon>$vuetify.icons.studentAdd</v-icon> Add
            </template>
          </v-btn>
        </template>
      </FxStudentListItem>
    </template>
    <template #selection />
  </v-autocomplete>
</template>

<script>
export default {
  name: 'FxStudentSelect',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    value: {
      type: Array,
      default: () => [],
    },
    schoolId: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: undefined,
    },

    items: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    search: null,
    loading: false,
  }),

  methods: {
    getItemText (item) {
      return `${item.firstname} ${item.lastname}`
    },
  },
}
</script>

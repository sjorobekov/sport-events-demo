<template>
  <v-select
    dense
    outlined
    hide-details
    multiple
    placeholder="Event"
    prepend-inner-icon="$vuetify.icons.staff"
    :items="values"
    chips
    :value="value"
    deletable-chips
    @input="$emit('input', $event)"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FxCalendarEventFilter',
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
  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),

    values () {
      return this.items.map((value) => {
        return {
          value,
          text: this.$t(`EVENT_TYPE.${value}`),
        }
      })
    },
  },
}
</script>

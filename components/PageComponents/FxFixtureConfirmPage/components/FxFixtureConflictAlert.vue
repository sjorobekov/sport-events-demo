<template>
  <v-alert prominent dark color="error">
    <v-row align="center">
      <v-col class="grow">
        <span class="text-h5s">This event is currently conflicting with another event due to a <strong v-text="label" /> clash.</span>
      </v-col>
      <v-col class="shrink">
        <slot name="default" />
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  name: 'FxFixtureConflictAlert',
  props: {
    conflict: {
      type: Object,
      required: true,
    },
  },

  computed: {
    label () {
      const items = []
      if (this.conflict.sportLocation) {
        items.push('Location')
      }

      if (this.conflict.lead) {
        items.push('Staff')
      }

      if (this.conflict.team) {
        items.push('Event')
      }

      if (items.length === 3) {
        return 'Location, Staff and Event'
      }

      return items.join(' and ')
    },
  },
}
</script>

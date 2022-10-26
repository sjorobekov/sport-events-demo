<template>
  <component :is="component" :value="value" />
</template>

<script>
import Desktop from './Desktop'
import Mobile from './Mobile'

export default {
  name: 'FxCalendarEvent',
  components: { Desktop, Mobile },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  computed: {
    compact () {
      return this.$vuetify.breakpoint.smAndDown
    },

    component () {
      return this.compact ? 'Mobile' : 'Desktop'
    },
  },
}
</script>

<template>
  <v-bottom-navigation
    class="elevation-2"
    grow
    app
    fixed
  >
    <v-btn v-for="(item, i) in items" :key="i" link :to="item.to" @click="item.onClick">
      <span class="text-p1 info--text">{{ item.title }}</span>
      <v-icon class="mr-0" size="25" color="info lighten-1" v-text="item.icon" />
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'FxBottomNav',

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    items () {
      return [
        { title: 'Calendar', icon: '$vuetify.icons.calendarRounded', to: { name: 'calendar' }, onClick: () => {} },
        { title: 'Teams', icon: '$vuetify.icons.teamsAlt', to: { name: 'teams' }, onClick: () => {} },
        { title: 'Records', icon: '$vuetify.icons.stopwatchAlt', to: { name: 'records' }, onClick: () => {} },
        { title: 'Menu', icon: 'mdi-menu', onClick: () => this.$emit('input', !this.value) },
      ]
    },
  },
}
</script>

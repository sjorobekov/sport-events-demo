<template>
  <v-bottom-navigation
    class="elevation-2 px-1"
    grow
    app
    fixed
    height="64px"
  >
    <v-btn
      v-for="(item, i) in items"
      :key="i"
      class="fx-bottom-menu mx-1 pt-1"
      link
      :to="item.to"
      @click="item.onClick"
    >
      <span class="text-p1 mb-1 menu-title">{{ item.title }}</span>
      <v-icon class="mr-0 menu-icon" size="28" v-text="item.icon" />
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
        { title: 'News', icon: '$vuetify.icons.bullhorn', to: { name: 'announcements' }, onClick: () => {} },
        { title: 'Menu', icon: 'mdi-menu', onClick: () => this.$emit('input', !this.value) },
      ]
    },
  },
}
</script>

<style scoped lang="scss">
.fx-bottom-menu {
  .menu-icon {
    color: var(--v-info-lighten1)!important;
    padding-bottom: 4px!important
  }

  .menu-title {
    color: var(--v-info-lighten1)!important;
  }

  &.v-btn--active {
    .menu-icon {
      color: var(--v-primary-base) !important;
    }
    .menu-title {
      color: var(--v-primary-base) !important;
      font-family: ProximaNova-Semibold, sans-serif!important;
      font-weight: 400;
    }
  }
}

.v-item-group.v-bottom-navigation .v-btn.v-btn--active {
  color: white;
  border-top: solid 6px var(--v-primary-base) !important;
  border-radius: 4px;
}

.theme--light.v-bottom-navigation .v-btn:not(.v-btn--active) {
  color: white!important;
  border-top: solid 6px white;
  border-radius: 4px;
}
</style>

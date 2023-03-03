<template>
  <v-bottom-navigation
    class="elevation-2 px-1 bottom-menu"
    grow
    app
    fixed
    :height="height"
  >
    <v-btn
      v-for="(item, i) in items"
      :key="i"
      class="fx-bottom-menu mx-1 pt-3"
      :class="{ 'pb-4': isPWA }"
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
import { mapGetters } from 'vuex'

export default {
  name: 'FxBottomNav',

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      isPWA: 'context/isPWA',
    }),
    items () {
      return [
        { title: 'Calendar', icon: '$vuetify.icons.calendarRounded', to: { name: 'calendar' }, onClick: () => {} },
        { title: 'Teams', icon: '$vuetify.icons.teamsAlt', to: { name: 'teams' }, onClick: () => {} },
        { title: 'News', icon: '$vuetify.icons.bullhorn', to: { name: 'announcements' }, onClick: () => {} },
        { title: 'Menu', icon: 'mdi-menu', onClick: () => this.$emit('input', !this.value) },
      ]
    },
    height () {
      return this.isPWA ? 80 : 64
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
}

.theme--light.v-bottom-navigation .v-btn:not(.v-btn--active) {
  color: white!important;
}

::v-deep.bottom-menu.v-item-group.v-bottom-navigation {
  .v-btn.v-btn--active::before {
    content:'';
    position: absolute;
    background-color: var(--v-primary-base);
    height: 6px;
    width: 50%;
    top: 0;
    left:0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    margin-left:auto;
    margin-right:auto;
    opacity: 1;
  }
}
</style>

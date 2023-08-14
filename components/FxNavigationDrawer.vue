<template>
  <v-navigation-drawer
    :width="width"
    :permanent="permanent"
    :right="right"
    app
    color="primary"
    dark
    :value="value"
    @input="$emit('input', $event)"
  >
    <template v-if="!hideLogo">
      <v-avatar size="144" class="mt-10 mb-6 mx-auto d-block school-logo-nav">
        <FxSchoolLogo class="logo" :value="contextSchool.logo" :color="contextSchool.color" />
      </v-avatar>

      <h1 v-balance-text class="text-p3 font-weight-bold white--text text-center px-2">
        {{ contextSchool.name }}
      </h1>

      <h2 class="text-p2 font-weight-bold white--text text-center mt-2 mb-6">
        Sports Portal
      </h2>
    </template>

    <v-list
      dense
      nav
      class="px-0 nav-list"
    >
      <template v-if="hideLogo && isLoggedIn">
        <FxUserItem :item="me" class="px-5" :to="{ name: 'settings' }" dark />
      </template>
      <template
        v-for="(item, i) in items"
      >
        <v-list-item
          v-if="!item.items"
          :key="i"
          link
          :to="item.to"
          :exact="item.exact"
          class="mb-0"
          :ripple="false"
        >
          <v-list-item-icon class="ml-4 mr-3">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-else
          :key="i"
          active-class="white--text"
          class="mb-0"
          :ripple="false"
        >
          <template #activator>
            <v-list-item-icon class="ml-4 mr-3">
              <v-icon v-text="item.icon" />
            </v-list-item-icon>
            <v-list-item-title class="font-weight-bold" v-text="item.title" />
          </template>

          <v-list-item
            v-for="(subitem, j) in item.items"
            :key="j"
            :to="subitem.to"
            link
            :exact="subitem.exact"
            active-class="active-link white--text"
            class="mb-0"
            :ripple="false"
          >
            <v-list-item-icon class="ml-4 mr-3">
              <v-icon v-text="subitem.icon" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold" v-text="subitem.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>

      <template v-if="hideLogo">
        <v-list-item v-if="!isLoggedIn" link :to="{ name: 'signin' }">
          <v-list-item-icon class="ml-4 mr-3">
            <v-icon> $vuetify.icons.login-1 </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              Log In
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-else @click="logOut">
          <v-list-item-icon class="ml-4 mr-3">
            <v-icon>$vuetify.icons.login-1</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              Log Out
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'
export default {
  name: 'NavigationDrawer',
  components: { FxSchoolLogo },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    permanent: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    hideLogo: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
      isLoggedIn: 'context/isLoggedIn',
      me: 'context/me',
      canSeeOrganising: 'user/acl/canSeeOrganising',
    }),

    width () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 224
        case 'sm': return 224
        default: return 240
      }
    },

    items () {
      const menu = [
        { title: 'Calendar', icon: '$vuetify.icons.calendar-outline', to: { name: 'calendar' } },
        { title: 'Announcements', icon: '$vuetify.icons.announcements-outline', to: { name: 'announcements' } },

        { title: 'Teams', icon: '$vuetify.icons.teams-outline', to: { name: 'teams' } },
        { title: 'In-House Sport', icon: '$vuetify.icons.in-house-outline', to: { name: 'in-house' } },
        { title: 'Sports Records', icon: '$vuetify.icons.stopwatch-outline', to: { name: 'records' } },
        {
          title: 'Directory',
          icon: '$vuetify.icons.directory-outline',
          to: { name: 'management-sports' },
          items: [
            { title: 'Sports Map', to: { name: 'directory-sports-map' } },
            { title: 'Opponents', to: { name: 'directory-opponents' } },
            { title: 'Sports Contacts', to: { name: 'directory-sports-contacts' } },
          ],
        },
      ]

      const dashboard = (this.isLoggedIn)
        ? { title: 'Dashboard', icon: '$vuetify.icons.dashboard-outline', exact: true, to: { name: 'dashboard' } }
        : { title: 'Home', icon: '$vuetify.icons.home-outline', exact: true, to: { name: 'home' } }
      menu.unshift(dashboard)

      if (this.canSeeOrganising) {
        menu.splice(3, 0, {
          title: 'Organising',
          icon: '$vuetify.icons.organising-outline',
          items: [
            { title: 'Today\'s Teams', to: { name: 'organising-todays-teams' } },
            { title: 'Confirm Fixtures', to: { name: 'organising-confirm-fixtures' } },
            { title: 'Missing Results', to: { name: 'organising-missing-results' } },
            { title: 'Participation', to: { name: 'organising-participation' } },
            { title: 'Create New Event', to: { name: 'events-add' } },
          ],
        })
      }

      return menu
    },
  },

  methods: {
    logOut () {
      this.$store.dispatch('context/logOut')
        .then(() => {
          window.location.reload()
        })
    },
  },
}
</script>

<style lang="sass">
.nav-list
  .v-list-item
    padding-top: 8px
    padding-bottom: 8px
    border-radius: 0
    .v-icon
      color: rgba(255, 255, 255, 0.8)
    .v-list-item__title
      color: rgba(255, 255, 255, 0.9)
      font-size: 1rem
    &::before
      border-radius: 0
    &:hover
      background-color: var(--v-primary-darken1)
      &::before
        background: none
    &.v-list-item--active
      background-color: var(--v-primary-darken1)
      box-shadow: inset 4px 0 0 0 #FFFFFF
      .v-icon
        color: white
      .v-list-item__title
        color: white
      &::before
        opacity: 0
  &::before
    border-radius: 0!important
  .v-list-group__header
    padding-top: 8px
    padding-bottom: 8px
    border-radius: 0
    margin-bottom: 0!important
.school-logo-nav
  overflow: visible!important
.logo
  overflow: visible!important
  -webkit-filter: drop-shadow(1px 1px 0 white) drop-shadow(-1px 1px 0 white) drop-shadow(1px -1px 0 white) drop-shadow(-1px -1px 0 white)
  filter: drop-shadow(1px 1px 0 white) drop-shadow(-1px 1px 0 white) drop-shadow(1px -1px 0 white) drop-shadow(-1px -1px 0 white)
</style>

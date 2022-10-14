<template>
  <v-navigation-drawer
    width="224"
    :permanent="permanent"
    :right="right"
    app
    color="primary"
    dark
    :value="value"
    @input="$emit('input', $event)"
  >
    <template v-if="!hideLogo">
      <v-avatar size="144" color="white" class="mt-10 mb-6 mx-auto d-block">
        <FxSchoolLogo :value="contextSchool.logo" color="primary" />
      </v-avatar>

      <h1 class="text-p3 font-weight-bold white--text text-center">
        {{ contextSchool.name }}
      </h1>

      <h2 class="text-p2 font-weight-bold white--text text-center mt-2 mb-6">
        Sports Portal
      </h2>
    </template>

    <v-list
      dense
      nav
      class="px-0"
    >
      <template v-if="hideLogo && isLoggedIn">
        <FxUserItem :item="me" class="px-5" :to="{ name: 'settings' } " />
        <v-divider />
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
          active-class="active-link"
          class="mb-0 border-radius-0"
        >
          <v-list-item-icon class="ml-4 mr-3">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="font-weight-bold text-p2">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-else
          :key="i"
          active-class="white--text"
          class="border-radius-0 mb-0"
        >
          <template #activator>
            <v-list-item-icon class="ml-4 mr-3">
              <v-icon v-text="item.icon" />
            </v-list-item-icon>
            <v-list-item-title class="font-weight-bold text-p2" v-text="item.title" />
          </template>

          <v-list-item
            v-for="(subitem, j) in item.items"
            :key="j"
            :to="subitem.to"
            link
            :exact="subitem.exact"
            active-class="active-link white--text"
            class="mb-0 border-radius-0"
          >
            <v-list-item-icon class="ml-4 mr-3">
              <v-icon v-text="subitem.icon" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold text-p2" v-text="subitem.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>

      <template v-if="hideLogo">
        <v-divider />
        <v-list-item v-if="!isLoggedIn" link :to="{ name: 'signin' }" class="border-radius-0">
          <v-list-item-icon class="ml-4 mr-3">
            <v-icon>mdi-login-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold  text-p2">
              Staff Log In
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-else class="border-radius-0" @click="logOut">
          <v-list-item-icon class="ml-4 mr-3">
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold text-p2">
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
      isLoggedIn: 'context/isLoggedIn',
    }),

    items () {
      const menu = [
        { title: 'Calendar', icon: '$vuetify.icons.calendar', to: { name: 'calendar' } },
        { title: 'Announcements', icon: '$vuetify.icons.whistle', to: { name: 'announcements' } },

        { title: 'Teams', icon: '$vuetify.icons.tshirt', to: { name: 'teams' } },
        { title: 'In-House Sport', icon: '$vuetify.icons.cup', to: { name: 'in-house' } },
        { title: 'Sports Records', icon: '$vuetify.icons.stopwatch', to: { name: 'records' } },
        {
          title: 'Directory',
          icon: '$vuetify.icons.ibook',
          to: { name: 'management-sports' },
          items: [
            { title: 'Sports Map', to: { name: 'directory-sports-map' } },
            { title: 'Sports Contacts', to: { name: 'directory-sports-contacts' } },
          ],
        },
      ]

      const dashboard = (this.isLoggedIn)
        ? { title: 'Sports Dashboard', icon: '$vuetify.icons.dashboard', exact: true, to: { name: 'dashboard' } }
        : { title: 'Sports Home', icon: '$vuetify.icons.dashboard', exact: true, to: { name: 'portal' } }
      menu.unshift(dashboard)

      if (this.canSeeOrganising) {
        menu.splice(3, 0, {
          title: 'Organising',
          icon: '$vuetify.icons.list',
          items: [
            { title: 'Today\'s Teams', to: { name: 'organising-todays-teams' } },
            { title: 'Confirm Fixtures', to: { name: 'organising-confirm-fixtures' } },
            { title: 'Missing Results', to: { name: 'organising-missing-results' } },
            { title: 'Participation', to: { name: 'organising-participation' } },
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

<style lang="sass" scoped>
.border-radius-0
  border-radius: 0
  &::before
    border-radius: 0
.active-link
  box-shadow: inset 4px 0 0 0 #FFFFFF
</style>

<style lang="sass">
.v-list-group__header
  border-radius: 0!important
  margin-bottom: 0!important
  &::before
    border-radius: 0!important
</style>

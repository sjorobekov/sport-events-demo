<template>
  <v-navigation-drawer width="224" permanent app color="primary" dark>
    <v-avatar size="144" color="white" class="mt-10 mb-6 mx-auto d-block">
      <FxSchoolLogo :value="contextSchool.logo" color="primary" />
    </v-avatar>

    <h1 class="text-p3 font-weight-bold white--text text-center">
      {{ contextSchool.name }}
    </h1>

    <h2 class="text-p2 font-weight-medium white--text text-center mt-2 mb-6">
      Sports Portal
    </h2>

    <v-list
      dense
      nav
      class="px-0"
    >
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
        >
          <template #activator>
            <v-list-item-icon class="ml-4 mr-3">
              <v-icon v-text="item.icon" />
            </v-list-item-icon>
            <v-list-item-title v-text="item.title" />
          </template>

          <v-list-item
            v-for="(subitem, j) in item.items"
            :key="j"
            :to="subitem.to"
            link
            :exact="subitem.exact"
            active-class="active-link white--text"
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
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'
export default {
  name: 'NavigationDrawer',
  components: { FxSchoolLogo },
  data: () => ({
    items: [
      { title: 'Sports Dashboard', icon: '$vuetify.icons.dashboard', exact: true, to: { name: 'dashboard' } },
      { title: 'Calendar', icon: '$vuetify.icons.calendar', to: { name: 'calendar' } },
      { title: 'Announcements', icon: '$vuetify.icons.whistle', to: { name: 'announcements' } },
      {
        title: 'Organising',
        icon: '$vuetify.icons.list',
        items: [
          { title: 'Today\'s Teams', to: { name: 'organising-todays-teams' } },
          { title: 'Confirm Fixtures', to: { name: 'organising-confirm-fixtures' } },
          { title: 'Missing Results', to: { name: 'organising-missing-results' } },
          { title: 'Participation', to: { name: 'organising-participation' } },
        ],
      },
      { title: 'Teams', icon: '$vuetify.icons.tshirt', to: { name: 'teams' } },
      { title: 'In-House Sport', icon: '$vuetify.icons.cup', to: { name: 'in-house-sport' } },
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
    ],
  }),

  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
    }),
  },
}
</script>

<style lang="sass" scoped>
.active-link
  border-radius: 0
  box-shadow: inset 4px 0 0 0 #FFFFFF
  &::before
    border-radius: 0
</style>

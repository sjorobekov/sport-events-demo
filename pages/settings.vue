<template>
  <div>
    <v-row>
      <v-col>
        <h3>{{ school.name }}</h3>
        <div class="subtitle-1">
          {{ location }}
        </div>
      </v-col>
    </v-row>
    <v-row class="d-md-none">
      <v-col>
        <v-tabs icons-and-text centered fixed-tabs>
          <v-tab
            v-for="(item, i) in tabItems"
            :key="i"
            link
            :to="item.to"
            :exact="item.exact"
          >
            {{ item.text }}
            <v-icon color="info lighten-1" v-text="item.icon" />
          </v-tab>

          <v-menu
            bottom
            left
          >
            <template #activator="{ on, attrs }">
              <v-tab
                v-bind="attrs"
                role="button"
                v-on="on"
              >
                More
                <v-icon color="info lighten-1">
                  $vuetify.icons.chevronDown
                </v-icon>
              </v-tab>
            </template>

            <v-list class="grey lighten-3">
              <v-list-item
                v-for="(item, i) in menuItems"
                :key="i"
                link
                :to="item.to"
              >
                <v-list-item-icon>
                  <v-icon color="info lighten-1" v-text="item.icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text--info text--darken-1" v-text="item.text" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-none d-sm-none d-md-block" md="4" lg="3">
        <v-card
          class="mx-auto"
          flat
          outlined
        >
          <v-list dense class="py-0">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              link
              :to="item.to"
              :exact="item.exact"
            >
              <v-list-item-icon class="mr-4">
                <v-icon color="info lighten-1" v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text--info text--darken-1" v-text="item.text" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col md="8" lg="9">
        <NuxtChild />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SettingsPage',

  data: () => ({}),

  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canSeeSettingsPage'],
  },

  head () {
    return {
      title: this.school.name,
    }
  },

  computed: {
    ...mapGetters({
      school: 'context/school',
      country: 'countries/name',
      canManageUsers: 'user/acl/canManageUsers',
      canManageInHouseTeams: 'user/acl/canManageInHouseTeams',
      canManageStudents: 'user/acl/canManageStudents',
      canCustomizeSchool: 'user/acl/canCustomizeSchool',
      canManageSubscription: 'user/acl/canManageSubscription',
      canManageSchoolPrivacy: 'user/acl/canManageSchoolPrivacy',
    }),
    location () {
      return [this.school.city, this.country(this.school.country)].join(', ')
    },
    items () {
      return [
        { text: 'Profile', icon: 'mdi-account-circle', exact: true, to: { name: 'settings' } },
        ...(this.canManageInHouseTeams ? [{ text: 'In-House Sport', icon: '$vuetify.icons.trophy', to: { name: 'settings-in-house-teams' } }] : []),
        ...(this.canManageStudents ? [{ text: 'Students', icon: '$vuetify.icons.student', to: { name: 'settings-students' } }] : []),
        ...(this.canManageSchoolPrivacy ? [{ text: 'Privacy', icon: '$vuetify.icons.shield', to: { name: 'settings-privacy' } }] : []),
        ...(this.canManageUsers ? [{ text: 'Users', icon: '$vuetify.icons.team', to: { name: 'settings-users' } }] : []),
        ...(this.canCustomizeSchool ? [{ text: 'Customisation', icon: '$vuetify.icons.settings', to: { name: 'settings-customisation' } }] : []),
        ...(this.canManageSubscription ? [{ text: 'Subscription', icon: '$vuetify.icons.repeat', to: { name: 'settings-subscription' } }] : []),
      ]
    },

    tabItems () {
      return this.items.slice(0, 4)
    },

    menuItems () {
      return this.items.slice(4)
    },
  },
}
</script>

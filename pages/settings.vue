<template>
  <div>
    <v-row>
      <v-col>
        <h3 class="neutral--text text--darken-4 font-weight-bold school-name">{{ school.name }}</h3>
        <div class="subtitle-1 neutral--text text--darken-3">
          {{ location }}
        </div>
      </v-col>
    </v-row>
    <v-row class="d-md-none">
      <v-col>
        <v-tabs icons-and-text centered class="settings-tabs">
          <v-tab
            v-for="(item, i) in tabItems"
            :key="i"
            link
            :to="item.to"
            :exact="item.exact"
            :ripple="false"
            class="mx-1 mb-0"
          >
            {{ item.text }}
            <v-icon color="neutral darken-1" v-text="item.icon" />
          </v-tab>

          <v-menu
            bottom
            left
          >
            <template #activator="{ on, attrs }">
              <v-tab
                v-bind="attrs"
                role="button"
                :ripple="false"
                v-on="on"
                class="mb-0"
              >
                More
                <v-icon color="neutral darken-1">
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
                :ripple="false"
              >
                <v-list-item-icon>
                  <v-icon color="neutral darken-1" v-text="item.icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="neutral--text text--darken-3" v-text="item.text" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-none d-sm-none d-md-block" md="4" lg="3">
        <v-card class="mx-auto">
          <div class="line-clamp-2">
            <v-list dense class="py-0 settings-menu">
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                link
                :to="item.to"
                :exact="item.exact"
                active-class="link-active deep"
                class="py-2 settings-menu-item"
                :ripple="false"
              >
                <v-list-item-icon class="mr-4">
                  <v-icon color="neutral darken-1" v-text="item.icon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="neutral--text text--darken-3" v-text="item.text" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
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
      canManageIntegrations: 'user/acl/canManageIntegrations',
    }),
    location () {
      return [this.school.city, this.country(this.school.country)].join(', ')
    },
    items () {
      return [
        { text: 'Profile', icon: '$vuetify.icons.user-1', exact: true, to: { name: 'settings' } },
        ...(this.canManageInHouseTeams ? [{ text: 'In-House Sport', icon: '$vuetify.icons.in-house-sport-1', to: { name: 'settings-in-house-teams' } }] : []),
        ...(this.canManageStudents ? [{ text: 'Students', icon: '$vuetify.icons.students-1', to: { name: 'settings-students' } }] : []),
        ...(this.canManageSchoolPrivacy ? [{ text: 'Privacy', icon: '$vuetify.icons.privacy-1', to: { name: 'settings-privacy' } }] : []),
        ...(this.canManageUsers ? [{ text: 'Users', icon: '$vuetify.icons.users-1', to: { name: 'settings-users' } }] : []),
        ...(this.canCustomizeSchool ? [{ text: 'Customisation', icon: '$vuetify.icons.customise-1', to: { name: 'settings-customisation' } }] : []),
        ...(this.canManageSubscription ? [{ text: 'Subscription', icon: '$vuetify.icons.subscription-1', to: { name: 'settings-subscription' } }] : []),
        ...(this.canManageIntegrations ? [{ text: 'Integrations', icon: '$vuetify.icons.integrations-1', to: { name: 'settings-integrations' } }] : []),
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

<style scoped>
.line-clamp-2 {
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}
.settings-menu /deep/ .link-active  {
  box-shadow: inset -4px 0 0 0 var(--v-primary-base) !important;
  background-color: var(--v-neutral-lighten2)!important;
}
.theme--light.v-tabs .v-tab:hover:before {
    opacity: 0;
}
.v-tab:before, .v-tabs-slider {
    background-color: currentColor;
}

.settings-tabs {
  border: 1px solid #E4E9EF;
  border-radius: 10px;
  overflow: hidden;
}

.settings-tabs /deep/ .v-slide-group__next,  .settings-tabs /deep/ .v-slide-group__prev{
  display: none!important;
}

.settings-menu-item:hover {
  background-color: var(--v-neutral-lighten2)!important;
}
.theme--light.v-list-item:before, .theme--light.v-list-item:hover:before, .theme--light.v-list-item:focus:before {
  opacity: 0;
}
.school-name {
  line-height: 1;
}
</style>

<template>
  <v-app-bar
    :height="height"
    app
    fixed
    class="shadow"
    :color="color"
    :dark="dark"
    :flat="flat"
  >
    <template v-if="isMobile">
      <v-list-item class="pl-0">
        <v-list-item-avatar color="white" size="44">
          <FxSchoolLogo :value="contextSchool.logo" :color="contextSchool.color" :size="44" />
        </v-list-item-avatar>
        <v-list-item-content class="school-name d-block text-center">
          <client-only>
            <h1 v-balance-text class="school-name font-weight-bold">
              {{ contextSchool.name }}
            </h1>
          </client-only>
        </v-list-item-content>
      </v-list-item>
      <v-app-bar-nav-icon @click="$emit('input', !value)">
        <v-icon>$vuetify.icons.menu-solid</v-icon>
      </v-app-bar-nav-icon>
    </template>
    <v-container v-else>
      <v-row align="center">
        <v-spacer />
        <v-btn v-if="!me" outlined color="neutral darken-2" link :to="{ name: 'signin' }">
          Log In
        </v-btn>

        <template v-else>
          <v-btn v-if="showUpgradePlanButton" :to="{ name: 'settings-subscription' }" depressed color="primary">
            <v-icon>mdi-rocket-launch</v-icon>
            Upgrade Now
          </v-btn>
          <v-menu
            left
            bottom
            offset-y
            content-class="user-menu"
          >
            <template #activator="{ on, attrs }">
              <div class="flex-shrink-1 flex-grow-0">
                <v-list-item class="px-0 user-menu-handler" v-bind="attrs" :ripple="false" v-on="on">
                  <v-list-item-content class="text-right">
                    <v-list-item-title class="menu-text font-weight-bold mb-0">
                      <FxUserDisplayName :user="me" />
                    </v-list-item-title>
                    <v-list-item-subtitle class="menu-text">
                      {{ me.jobRole }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-avatar class="ml-3">
                    <FxAvatar
                      size="32"
                      :value="me.avatar"
                    />
                  </v-list-item-avatar>
                  <v-list-item-icon class="ml-0">
                    <v-icon color="neutral lighten1" size="24">
                      $vuetify.icons.chevron-down
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </div>
            </template>
            <v-list class="py-0">
              <FxUserItem class="px-4 py-2" :item="me" :subtitle="me.email" />

              <v-divider />
              <v-list-item class="user-menu-item" :to="{ name: 'settings' }" :ripple="false">
                <v-list-item-icon class="mr-3">
                  <v-icon color="neutral darken-1">
                    $vuetify.icons.settings
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="user-menu-text font-weight-bold neutral--text text--darken-2">
                    Settings
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="user-menu-item" href="https://help.fixturr.com" :ripple="false">
                <v-list-item-icon class="mr-3">
                  <v-icon>$vuetify.icons.interrogationMark</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="user-menu-text font-weight-bold neutral--text text--darken-2">
                    Help Center
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
              <v-list-item class="user-menu-item" :ripple="false" @click="logOut">
                <v-list-item-content>
                  <v-list-item-title class="user-menu-text font-weight-bold error--text">
                    Log Out
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon color="error">
                    $vuetify.icons.login
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import FxAvatar from '@/components/FxAvatar/FxAvatar'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

export default {
  name: 'AppBar',
  components: { FxSchoolLogo, FxAvatar },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  head () {
    return {
      meta: [
        {
          name: 'theme-color',
          content: this.contextSchool.color,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      me: 'context/me',
      isMobileDevice: 'context/isMobile',
      isTabletDevice: 'context/isTablet',
      contextSchool: 'context/school',
      showUpgradePlanButton: 'context/showUpgradePlanButton',
    }),
    items () {
      return [
        {
          title: 'Settings',
          icon: '$vuetify.icons.settings',
          handler: () => this.$router.push({ name: 'settings' }),
        },
        {
          title: 'Help Center',
          icon: '$vuetify.icons.interrogationMark',
          to: 'https://help.fixturr.com/',
        },
        {
          title: 'Logout',
          handler: () => this.logOut(),
        },
      ]
    },

    isMobile () {
      if (process.client) {
        return this.$vuetify.breakpoint.smAndDown
      }

      return this.isMobileDevice || this.isTabletDevice
    },

    drawerPermanent () {
      return !this.isMobile
    },

    height () {
      return this.isMobile ? '92' : '48'
    },

    color () {
      return this.isMobile ? 'primary' : 'white'
    },

    dark () {
      return this.isMobile
    },

    flat () {
      return this.isMobile
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

<style scoped>
.shadow {
  box-shadow: 0px 1px 0px  var(--v-neutral-lighten1)!important;
}
.school-name {
  font-size: 18px;
  line-height: 19px;
}

.menu-text {
  color: var(--v-neutral-darken1)!important;
  font-size: 14px;
}

.user-menu-text {
  font-size: 14px;
}

.user-menu /deep/ {
  border-radius: 12px!important;
}

.user-menu-handler.v-list-item:hover::before /deep/ {
  opacity: 0!important;
}

.v-menu__content {
  box-shadow: 0 0 4px rgb(0 0 0 / 4%), 0 8px 16px rgb(0 0 0 / 8%);
}

.theme--light.v-divider {
  border-color: #F1F5F9;
}

.user-menu-item:hover {
  background-color: var(--v-neutral-lighten2)!important;
}
.theme--light.v-list-item:before, .theme--light.v-list-item:hover:before, .theme--light.v-list-item:focus:before {
  opacity: 0;
}
</style>

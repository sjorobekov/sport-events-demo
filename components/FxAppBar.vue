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
        <v-list-item-content>
          <v-list-item-title>
            {{ contextSchool.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-app-bar-nav-icon @click="$emit('input', !value)" />
    </template>
    <v-container v-else>
      <v-row align="center">
        <v-spacer />

        <v-btn v-if="!me" outlined color="info darken-1" link :to="{ name: 'signin' }">
          <v-icon size="14">
            $vuetify.icons.signin
          </v-icon> Sign In
        </v-btn>

        <template v-else>
          <v-btn icon class="mr-2">
            <v-icon size="32" color="secondary">
              $vuetify.icons.bell
            </v-icon>
          </v-btn>

          <v-menu
            left
            bottom
          >
            <template #activator="{ on, attrs }">
              <FxAvatar
                v-bind="attrs"
                size="32"
                :value="me.avatar"
                v-on="on"
              />
            </template>

            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click="item.handler"
              >
                <v-list-item-title v-text="item.title" />
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
  computed: {
    ...mapGetters({
      me: 'context/me',
      isMobileDevice: 'context/isMobile',
      isTabletDevice: 'context/isTablet',
      contextSchool: 'context/school',
    }),
    items () {
      return [
        { title: 'Settings', handler: () => this.$router.push({ name: 'settings' }) },
        { title: 'Logout', handler: () => this.logOut() },
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
      return this.isMobile ? '92' : '56'
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
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25)!important;
}
</style>

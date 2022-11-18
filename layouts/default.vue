<template>
  <v-app>
    <AppBar v-model="drawer" />
    <v-main>
      <FxNavigationDrawer v-model="drawer" :permanent="drawerPermanent" :right="isMobile" :hide-logo="isMobile" />
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import FxNavigationDrawer from '@/components/FxNavigationDrawer'
import AppBar from '@/components/FxAppBar'

export default {
  name: 'DefaultLayout',

  components: {
    FxNavigationDrawer,
    AppBar,
  },

  data: () => ({
    drawer: false,
  }),

  head () {
    return {
      title: this.contextSchool?.name,
    }
  },

  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
      isMobileDevice: 'context/isMobile',
      isTabletDevice: 'context/isTablet',
    }),

    isMobile () {
      if (process.client) {
        return this.$vuetify.breakpoint.smAndDown
      }

      return this.isMobileDevice || this.isTabletDevice
    },

    drawerPermanent () {
      return !this.isMobile
    },
  },
}
</script>

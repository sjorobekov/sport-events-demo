<template>
  <v-app>
    <AppBar v-model="drawer" />
    <v-main :class="isMobile ? 'padding-top-92' : 'pt-12'">
      <FxNavigationDrawer v-model="drawer" :permanent="drawerPermanent" :mini-variant="false" :right="isMobile" :hide-logo="isMobile" />
      <v-container>
        <nuxt />
      </v-container>

      <FxBottomNav v-if="isMobile" v-model="drawer" />
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

<style scoped>
.padding-top-92 {
  padding-top: 92px!important;
}
</style>

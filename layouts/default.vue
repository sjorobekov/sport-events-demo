<template>
  <v-app>
    <FxNavigationDrawer v-model="drawer" :permanent="drawerPermanent" :right="isMobile" :hide-logo="isMobile" />
    <FxMobileAppBar v-if="isMobile" v-model="drawer" />
    <AppBar v-else v-model="drawer" />
    <v-main>
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
import FxMobileAppBar from '@/components/FxMobileAppBar'

export default {
  name: 'DefaultLayout',

  components: {
    FxNavigationDrawer,
    AppBar,
    FxMobileAppBar,
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
    }),

    isMobile () {
      return this.$vuetify.breakpoint.smAndDown
    },

    drawerPermanent () {
      return !this.isMobile
    },
  },
}
</script>

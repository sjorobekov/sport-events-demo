<template>
  <v-app>
    <AppBar v-model="drawer" class="d-print-none" />
    <v-main>
      <FxNavigationDrawer v-model="drawer" :permanent="drawerPermanent" :right="isMobile" :hide-logo="isMobile" class="d-print-none" />
      <v-container>
        <nuxt />
      </v-container>

      <FxBottomNav v-if="isMobile" v-model="drawer" class="d-print-none" />
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

<style scoped lang="sass">
@import '~vuetify/src/styles/styles'
.v-main
  padding-top: 92px!important

@media #{map-get($display-breakpoints, 'md-and-up')}
  .v-main
    padding-top: 48px!important
@media print
  .v-main
    padding: 0!important
</style>

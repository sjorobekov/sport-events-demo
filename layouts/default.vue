<template>
  <v-app>
    <FxNavigationDrawer />
    <AppBar />
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

export default {
  name: 'DefaultLayout',

  components: {
    FxNavigationDrawer,
    AppBar,
  },

  head () {
    return {
      title: this.contextSchool?.name,
    }
  },

  computed: {
    ...mapGetters({
      contextSchool: 'context/school',
    }),
  },
}
</script>

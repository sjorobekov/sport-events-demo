<template>
  <v-app>
    <FxNavigationDrawer />
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

export default {
  name: 'DefaultLayout',

  components: {
    FxNavigationDrawer,
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

<template>
  <v-app-bar
    height="92"
    app
    fixed
    dark
    flat
    color="primary"
  >
    <v-list-item>
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
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

export default {
  name: 'FxMobileAppBar',
  components: { FxSchoolLogo },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      me: 'context/me',
      contextSchool: 'context/school',
    }),
    items () {
      return [
        { title: 'Settings', handler: () => this.$router.push({ name: 'settings' }) },
        { title: 'Logout', handler: () => this.logOut() },
      ]
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

<template>
  <v-app-bar height="56" app fixed elevation="1" color="white">
    <v-container>
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

export default {
  name: 'AppBar',
  components: { FxAvatar },
  computed: {
    ...mapGetters({
      me: 'context/me',
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

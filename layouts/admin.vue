<template>
  <v-app>
    <AdminNavigationDrawer />
    <v-app-bar
      app
      fixed
      class="shadow"
    >
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
    <v-main>
      <v-container class="pt-12">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { UserRole } from '@/enum'
import AdminNavigationDrawer from '@/components/admin/FxNavigationDrawer'
import FxAvatar from '@/components/FxAvatar/FxAvatar'

export default {
  name: 'AdminLayout',

  components: {
    FxAvatar,
    AdminNavigationDrawer,
  },

  middleware: ({ req, error, store, redirect, route }) => {
    const hostname = process.server ? req.headers.host : window.location.hostname
    const subdomain = hostname.split('.')[0]
    if (subdomain !== 'admin') {
      error({ statusCode: 404, message: 'Page not found' })
    }

    if (!store.getters['context/isLoggedIn']) {
      return redirect({ name: 'login', query: { redirectTo: route.fullPath } })
    }

    if (store.getters['context/role'] !== UserRole.SUPER_ADMIN) {
      error({ statusCode: 403, message: 'Access Denied' })
    }
  },

  computed: {
    ...mapGetters({
      me: 'context/me',
    }),
    items () {
      return [
        { title: 'Logout', handler: () => this.logOut() },
      ]
    },
  },
}
</script>

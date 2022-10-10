<template>
  <v-app>
    <AdminNavigationDrawer />
    <AdminAppBar />
    <v-main>
      <v-container class="pt-12">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { UserRole } from '@/enum'
import AdminNavigationDrawer from '@/components/admin/FxNavigationDrawer'
import AdminAppBar from '@/components/FxAppBar'

export default {
  name: 'AdminLayout',

  components: {
    AdminNavigationDrawer,
    AdminAppBar,
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
}
</script>

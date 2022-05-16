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
import AdminNavigationDrawer from '@/components/admin/NavigationDrawer'
import AdminAppBar from '@/components/admin/AppBar'

export default {
  name: 'AdminLayout',

  components: {
    AdminNavigationDrawer,
    AdminAppBar,
  },

  middleware: ({ req, error, store }) => {
    const hostname = process.server ? req.headers.host : window.location.hostname
    const subdomain = hostname.split('.')[0]
    if (subdomain !== 'admin') {
      error({ statusCode: 404, message: 'Page not found' })
    }

    if (store.getters['context/role'] !== 'SUPER_ADMIN') {
      error({ statusCode: 403, message: 'Access Denied' })
    }
  },
}
</script>

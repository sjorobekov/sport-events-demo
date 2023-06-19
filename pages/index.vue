<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h1>Fixturr</h1>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'empty',
  middleware: ({ redirect, store, error, route }) => {
    if (store.getters['context/isPortalSite']) {
      if (store.getters['context/isLoggedIn']) {
        return redirect({ name: 'dashboard' })
      }
      return redirect({ name: 'home' })
    }

    if (store.getters['context/isSignUpSite']) {
      return redirect({ name: 'signup' })
    }

    if (store.getters['context/isFindMySchoolSite']) {
      return redirect({ name: 'find' })
    }

    if (store.getters['context/isSuperAdminSite']) {
      return redirect({ name: 'management' })
    }

    if (store.getters['context/isCheckoutSite']) {
      return redirect({ name: 'checkout', query: route.query })
    }

    error({ statusCode: 404, message: 'Page not found' })
  },
}
</script>

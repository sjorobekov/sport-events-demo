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
  middleware: ({ redirect, store }) => {
    if (store.getters['context/isPortalSite']) {
      if (store.getters['context/isLoggedIn']) {
        return redirect({ name: 'dashboard' })
      }
      return redirect({ name: 'home' })
    }

    return redirect({ name: 'management' })
  },
}
</script>

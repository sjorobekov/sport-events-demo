<template>
  <v-navigation-drawer width="224" permanent app color="brand" dark>
    <v-img class="mt-10 mb-12 mx-6" src="/logo.svg" />

    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.to"
        :exact="item.exact"
      >
        <v-list-item-icon class="ml-4 mr-3">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  data: () => ({
    items: [
      { title: 'Dashboard', icon: '$vuetify.icons.dashboard', exact: true, to: { name: 'management' } },
      { title: 'Schools', icon: '$vuetify.icons.school', to: { name: 'management-schools' } },
      { title: 'Events', icon: '$vuetify.icons.calendar', to: { name: 'management-events' } },
      { title: 'Sports', icon: '$vuetify.icons.whistle', to: { name: 'management-sports' } },
    ],
  }),
}
</script>

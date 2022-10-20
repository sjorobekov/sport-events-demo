<template>
  <div>
    <v-row>
      <v-col>
        <h2>Sports Records</h2>
      </v-col>
    </v-row>
    <v-row class="d-md-none">
      <v-col>
        <v-tabs icons-and-text centered fixed-tabs>
          <v-tab
            v-for="(item, i) in items"
            :key="i"
            link
            :to="item.to"
            :exact="item.exact"
          >
            {{ item.text }}
            <v-icon color="info lighten-1" v-text="item.icon" />
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-none d-sm-none d-md-block" md="4" lg="3">
        <v-card
          class="mx-auto"
          flat
          outlined
        >
          <v-list dense class="py-0">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              link
              :to="item.to"
              :exact="item.exact"
            >
              <v-list-item-icon class="mr-4">
                <v-icon color="info lighten-1" v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text--info text--darken-1" v-text="item.text" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col md="8" lg="9">
        <NuxtChild />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'RecordsManage',
  data: () => ({}),

  computed: {
    items () {
      return [
        { text: 'Sports & Events', icon: 'mdi-account-circle', exact: true, to: { name: 'records-manage-events' } },
        { text: 'Categories', icon: '$vuetify.icons.calendar', to: { name: 'records-manage-categories' } },
      ]
    },
  },
}
</script>

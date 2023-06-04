<template>
  <div>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="text-h4 neutral--text text--darken-4 font-weight-bold">
          Seasons
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn depressed dark color="primary" :to="{ name: 'settings-seasons-add' }" link>
          <v-icon>$vuetify.icons.add-all</v-icon>Add Season
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-card>
      <client-only>
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-0"
          hide-default-footer
          must-sort
        >
          <template #item.starts="{ item }">
            <FxDateFormat :date="item.start" />
          </template>
          <template #item.ends="{ item }">
            <FxDateFormat :date="item.end" />
          </template>
          <template #item.action="{ item }">
            <v-menu>
              <template #activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon color="neutral darken-1">
                    $vuetify.icons.threeDots
                  </v-icon>
                </v-btn>
              </template>
              <v-list class="grey lighten-3">
                <v-list-item link :to="{ name: 'settings-seasons-seasonId', params: { seasonId: item.id } }">
                  <v-list-item-content>
                    <v-list-item-title class="neutral--text text--darken-3">
                      Edit Season
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </client-only>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SchoolSeasons',
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canManageSeasons'],
  },
  data: () => ({
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Starts', value: 'starts' },
      { text: 'Ends', value: 'ends' },
      { text: 'Status', value: 'status' },
      { text: 'Action', value: 'action' },
    ],
    loading: false,
  }),

  head: () => ({ title: 'Seasons' }),

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
      items: 'seasons/all',
    }),
  },
}
</script>
<style scoped>
.theme--light.v-data-table {
  color: var(--v-neutral-darken3);
}
</style>

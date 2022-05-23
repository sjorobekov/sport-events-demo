<template>
  <div>
    <v-row>
      <v-col>
        <v-list color="info lighten-4" class="mb-2">
          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title class="text-h4">
                In House Sports
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn dark color="brand" depressed :to="{ name: 'management-sports-add' }">
                <v-icon>$vuetify.icons.plusOutline</v-icon>Add House Team
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <client-only>
          <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-0"
            hide-default-footer
          >
            <template #item.name="{ item }">
              {{ item.name }}
            </template>
            <template #item.action="{ item }">
              <v-menu>
                <template #activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="info lighten-1">
                      $vuetify.icons.threeDots
                    </v-icon>
                  </v-btn>
                </template>
                <v-list class="grey lighten-3">
                  <v-list-item link :to="{ name: 'management-schools-id-users-userId', params: { userId: item.id } }">
                    <v-list-item-content>
                      <v-list-item-title class="text--info text--darken-1">
                        Edit
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item link>
                    <v-list-item-content>
                      <v-list-item-title class="text--info text--darken-1">
                        Delete
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </client-only>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'AdminInHouseSportsPage',
  layout: 'admin',

  data: () => ({
    headers: [
      {
        text: 'House Team Name',
        sortable: true,
        value: 'name',
      },
      { text: 'Action', value: 'action', sortable: false },
    ],
    items: [],
    loading: false,
  }),

  async fetch () {
    this.loading = true
    try {
      const { data, meta } = await this.$store.dispatch('api/users/list', {
        schoolId: this.$route.params.id,
      })
      this.items = data
      this.meta = meta
    } finally {
      this.loading = false
    }
  },
}
</script>

<template>
  <div>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="text-h4 neutral--text text--darken-4">
          In-House Sport
        </v-list-item-title>
        <v-list-item-subtitle />
      </v-list-item-content>
      <v-list-item-action>
        <v-btn depressed dark color="primary" :to="{ name: 'settings-in-house-teams-add' }" link>
          <v-icon>$vuetify.icons.add-all</v-icon>Add House Team
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-card>
      <client-only>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-default-footer
          disable-pagination
        >
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
                <v-list-item link :to="{ name: 'settings-in-house-teams-teamId', params: { teamId: item.id } }">
                  <v-list-item-content>
                    <v-list-item-title class="neutral text--darken-3">
                      Edit Team
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="remove(item)">
                  <v-list-item-content>
                    <v-list-item-title class="neutral text--darken-3">
                      Delete Team
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
  name: 'InHouseSportsPage',
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canManageInHouseTeams'],
  },
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
      this.items = await this.$store.dispatch('api/inHouseTeams/list', {
        schoolId: this.contextSchoolId,
      })
    } finally {
      this.loading = false
    }
  },
  head: () => ({ title: 'In-House Sport Teams' }),
  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
  },
  methods: {
    remove (item) {
      if (!confirm('Are you sure?')) {
        return
      }

      this.$store.dispatch('api/inHouseTeams/remove', item).then(() => {
        const index = this.items.indexOf(item)
        this.items.splice(index, 1)
      }).catch(() => {
        this.$toast.error('Unknown Error')
      })
    },
  },
}
</script>
<style scoped>
.theme--light.v-data-table {
  color: var(--v-neutral-darken3);
}
</style>

<template>
  <div>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="text-h4">
          Users
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn depressed color="primary" :to="{ name: 'settings-users-invite' }" link>
          <v-icon>$vuetify.icons.plusOutline</v-icon>Invite User
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-card flat outlined>
      <client-only>
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-0"
          :server-items-length="meta.total"
          hide-default-footer
          :sort-by.sync="query.orderBy"
          :sort-desc.sync="query.orderDesc"
          :page="query.page"
          must-sort
        >
          <template #item.firstname="{ item }">
            <FxUserItem :item="item" link :to="{ name: 'settings-users-userId', params: { userId: item.id } }" :subtitle="item.email" />
          </template>
          <template #item.userRole="{ item }">
            <client-only><FxUserRole :role="item.userRole" /></client-only>
          </template>
          <template #item.status="{ item }">
            <FxUserStatus :enabled="item.enabled" :last-active="item.lastActive" />
          </template>
          <template #item.lastActive="{ item }">
            <FxTimeAgo :value="item.lastActive" />
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
                <v-list-item link>
                  <v-list-item-content>
                    <v-list-item-title class="text--info text--darken-1">
                      Send Password Reset
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link :to="{ name: 'settings-users-userId', params: { userId: item.id } }">
                  <v-list-item-content>
                    <v-list-item-title class="text--info text--darken-1">
                      Edit User
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-content>
                    <v-list-item-title class="text--info text--darken-1">
                      Delete User
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
        <v-pagination
          v-if="meta.total > 20"
          v-model.lazy="query.page"
          :length="meta.lastPage"
        />
      </client-only>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxUserStatus from '@/components/admin/FxUserStatus'
import FxUserRole from '@/components/admin/FxUserRole'
import FxTimeAgo from '@/components/FxTimeAgo'

export default {
  name: 'SchoolUsers',
  components: { FxUserStatus, FxUserRole, FxTimeAgo },
  data: () => ({
    headers: [
      {
        text: 'Name & Email',
        sortable: true,
        value: 'firstname',
      },
      { text: 'User Role', value: 'userRole' },
      { text: 'Status', value: 'status' },
      { text: 'Last Active', value: 'lastActive' },
      { text: 'Action', value: 'action', sortable: false },
    ],
    items: [],
    query: {
      page: 1,
      orderBy: 'name',
      orderDesc: false,
    },
    meta: { total: 0 },
    loading: false,
  }),

  async fetch () {
    this.loading = true
    try {
      const { data, meta } = await this.$store.dispatch('api/users/list', {
        schoolId: this.schoolId,
        params: this.query,
      })
      this.items = data
      this.meta = meta
    } finally {
      this.loading = false
    }
  },

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },

  watch: {
    query: {
      async handler () {
        await this.$router.push({ query: this.query })
        this.$fetch()
      },
      deep: true,
    },
  },

  created () {
    this.query = {
      ...this.$route.query,
      page: parseInt(this.$route.query.page) || 1,
      orderDesc: this.$route.query.orderDesc !== 'false',
    }
  },
}
</script>

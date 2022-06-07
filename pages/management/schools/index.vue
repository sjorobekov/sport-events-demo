<template>
  <v-row>
    <v-col>
      <v-list color="info lighten-4" class="mb-2">
        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title class="text-h4">
              Schools
            </v-list-item-title>
            <v-list-item-subtitle class="subtitle-1 text--info text--darken-2">
              {{ meta.total }} Schools in database
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn dark color="brand" depressed :to="{ name: 'management-schools-add' }">
              <v-icon>$vuetify.icons.plusOutline</v-icon>Add School
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-card flat outlined>
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
          <template #item.name="{ item }">
            <nuxt-link :to="{ name: 'management-schools-id', params: { id: item.id }}">
              {{ item.name }}
            </nuxt-link>
          </template>
          <template #item.city_country="{ item }">
            <no-ssr><span>{{ item.city }}<span v-if="item.city && item.country">,</span> <FxCountryName :code="item.country" /></span></no-ssr>
          </template>
          <template #item.status="{ item }">
            <FxSchoolStatus :last-active="item.lastActive" :portal="item.portal" />
          </template>
        </v-data-table>
      </v-card>

      <v-pagination
        v-if="meta.total > 20"
        v-model.lazy="query.page"
        :length="meta.lastPage"
      />
    </v-col>
  </v-row>
</template>

<script>
import FxSchoolStatus from '~/components/admin/FxSchoolStatus.vue'
import FxCountryName from '~/components/FxCountryName.vue'

export default {
  name: 'SchoolListPage',
  components: {
    FxSchoolStatus,
    FxCountryName,
  },
  layout: 'admin',
  data: () => ({
    headers: [
      {
        text: 'School',
        align: 'start',
        sortable: true,
        value: 'name',
      },
      { text: 'City & Country', value: 'city_country' },
      { text: 'Number of Users', value: 'usersCount', sortable: false },
      { text: 'Status', value: 'status' },
      { text: 'Plan', value: 'plan.name', sortable: false },
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
      const { data, meta } = await this.$store.dispatch('api/schools/list', this.query)
      this.items = data
      this.meta = meta
    } finally {
      this.loading = false
    }
  },

  head () {
    return {
      title: 'Schools',
    }
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

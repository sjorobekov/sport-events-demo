<template>
  <div>
    <h1>Sports Records</h1>
    <v-container class="d-flex justify-end">
      <v-btn outlined link :to="{ name: 'records-manage-events' }">
        Manage
      </v-btn>
      <v-btn
        depressed
        dark
        color="primary"
        class="ml-2"
        link
        :to="{ name: 'records-add' }"
      >
        <v-icon>mdi-plus-circle-outline</v-icon>
        Add Sports Record
      </v-btn>
    </v-container>
    <v-container>
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
          <template #item.event="{ item }">
            <span>{{ item.sportsRecordEvent.name }}</span>
          </template>
          <template #item.category="{ item }">
            <span>{{ item.sportsRecordCategory.name }}</span>
          </template>
          <template #item.student="{ item }">
            <span>{{ item.student.firstname }} {{ item.student.lastname }}</span>
          </template>
          <template #item.date="{ item }">
            <FxDateFormat :date="item.date" output-format="dd-MM-yyyy" />
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
                <v-list-item link :to="{ name: 'records-id', params: { id: item.id } }">
                  <v-list-item-content>
                    <v-list-item-title class="text--info text--darken-1">
                      Edit Record
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="remove(item)">
                  <v-list-item-content>
                    <v-list-item-title class="text--info text--darken-1">
                      Delete Record
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
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RecordsPage',
  data: () => ({
    headers: [
      {
        text: 'Event',
        sortable: false,
        value: 'event',
      },
      { text: 'Category', value: 'category', sortable: false },
      { text: 'Student', value: 'student', sortable: false },
      { text: 'Record/Score', value: 'score' },
      { text: 'Date', value: 'date' },
      { text: 'Action', value: 'action', sortable: false },
    ],
    items: [],
    query: {
      page: 1,
      orderBy: 'date',
      orderDesc: true,
    },
    meta: { total: 0 },
  }),

  async fetch () {
    this.loading = true
    try {
      const { data, meta } = await this.$store.dispatch('api/sportsRecords/list', {
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

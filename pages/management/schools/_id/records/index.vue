<template>
  <v-card flat outlined>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h4">
          Sports Records
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn outlined color="brand" :to="{ name: 'management-schools-id-records-add' }" link>
          <v-icon>$vuetify.icons.plusOutline</v-icon>Add Record
        </v-btn>
      </v-list-item-action>
    </v-list-item>
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
        <template #item.sport="{ item }">
          <span>{{ item.sport.name }}</span>
        </template>
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
              <v-list-item link :to="{ name: 'management-schools-id-records-recordId', params: { recordId: item.id } }">
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
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AdminRecordsPage',
  layout: 'admin',
  data: () => ({
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
    formattedDate () {
      return this.query.date ? DateTime.fromISO(this.query.date).toFormat('dd-MM-yyyy') : ''
    },
    headers () {
      const headers = [
        { text: 'Sport', value: 'sport', sortable: false },
        { text: 'Event', value: 'event', sortable: false },
        { text: 'Category', value: 'category', sortable: false },
        { text: 'Student', value: 'student', sortable: false },
        { text: 'Record/Score', value: 'score' },
        { text: 'Date', value: 'date' },
        { text: 'Action', value: 'action', sortable: false },
      ]
      return headers
    },
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

  methods: {
    remove (item) {
      if (!confirm('Are you sure?')) {
        return
      }

      this.$store.dispatch('api/sportsRecords/remove', item).then(() => {
        const index = this.items.indexOf(item)
        this.items.splice(index, 1)
      }).catch(() => {
        this.$toast.error('Unknown Error')
      })
    },
  },
}
</script>

<template>
  <div>
    <h1>Sports Records</h1>
    <v-row>
      <v-col cols="7">
        <v-row no-gutters class="d-flex flex-wrap">
          <v-col cols="3">
            <FxSportSelect v-model="query.sportId" class="pr-2" clearable />
          </v-col>
          <v-col cols="3">
            <FxRecordEventSelect v-model="query.sportsRecordEventId" class="pr-2" clearable />
          </v-col>
          <v-col cols="3">
            <FxRecordCategorySelect v-model="query.sportsRecordCategoryId" class="pr-2" clearable />
          </v-col>
          <v-col cols="3">
            <v-menu ref="menu" offset-y :close-on-content-click="false">
              <template #activator="{ on, attrs }">
                <v-text-field
                  id="date"
                  :value="formattedDate"
                  readonly
                  outlined
                  dense
                  clearable
                  v-bind="attrs"
                  placeholder="Date"
                  prepend-inner-icon="mdi-clock-outline"
                  background-color="white"
                  v-on="on"
                  @input="update('date', $event)"
                />
              </template>
              <v-date-picker
                ref="picker"
                :value="query.date"
                @input="update('date', $event)"
              />
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer />
      <v-col v-if="canManageSportsRecords" cols="4">
        <div class="d-flex justify-end">
          <v-btn class="mr-2" outlined link :to="{ name: 'records-manage-events' }">
            Manage
          </v-btn>
          <v-btn
            depressed
            dark
            color="primary"
            link
            :to="{ name: 'records-add' }"
          >
            <v-icon>mdi-plus-circle-outline</v-icon>
            Add Sports Record
          </v-btn>
        </div>
      </v-col>
    </v-row>
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
          <v-list-item>
            <v-list-item-avatar v-if="item.sport.icon">
              <v-img :src="item.sport.icon" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.sportsRecordEvent.name" />
              <v-list-item-subtitle v-text="item.sport.name" />
            </v-list-item-content>
          </v-list-item>
        </template>
        <template #item.category="{ item }">
          <span>{{ item.sportsRecordCategory.name }}</span>
        </template>
        <template #item.student="{ item }">
          <span v-if="item.student">{{ item.student.firstname }} {{ item.student.lastname }}</span>
          <span v-else>{{ item.studentName }}</span>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'

export default {
  name: 'RecordsPage',
  data: () => ({
    items: [],
    query: {
      page: 1,
      orderBy: 'date',
      orderDesc: true,
      date: '',
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
      canManageSportsRecords: 'user/acl/canManageSportsRecords',
    }),
    formattedDate () {
      return this.query.date ? DateTime.fromISO(this.query.date).toFormat('dd-MM-yyyy') : ''
    },
    headers () {
      const headers = [
        {
          text: 'Event',
          sortable: false,
          value: 'event',
        },
        { text: 'Category', value: 'category', sortable: false },
        { text: 'Student', value: 'student', sortable: false },
        { text: 'Record/Score', value: 'score' },
        { text: 'Date', value: 'date' },
      ]
      if (this.canManageSportsRecords) {
        headers.push({ text: 'Action', value: 'action', sortable: false })
      }
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
    update (key, value) {
      this.query = { ...this.query, [key]: value }
    },
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

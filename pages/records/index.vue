<template>
  <div>
    <v-list-item class="px-0 mt-1 mt-md-n4">
      <v-list-item-content>
        <h1 class="text-h4s text-md-h3">
          Sports Records
        </h1>
      </v-list-item-content>
      <v-list-item-action class="hidden-md-and-up">
        <FxSportsRecordsFilterDialog v-model="query" :events="events" :sports="sports" @click:clear="clearAll">
          <template #activator="{ on, attrs }">
            <v-badge
              bordered
              color="primary"
              :content="selectedFilters"
              :value="selectedFilters"
              overlap
            >
              <v-btn
                v-bind="attrs"
                rounded
                outlined
                color="info"
                v-on="on"
              >
                <v-icon>mdi-filter-outline</v-icon>
                Filters
              </v-btn>
            </v-badge>
          </template>
        </FxSportsRecordsFilterDialog>
      </v-list-item-action>
      <v-list-item-action v-if="canManageSportsRecords" class="hidden-md-and-up">
        <v-menu>
          <template #activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">
              mdi-dots-vertical
            </v-icon>
          </template>
          <v-list>
            <v-list-item :to="{ name: 'records-manage-events' }">
              <v-list-item-content>
                <v-list-item-title>Manage</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{ name: 'records-add' }">
              <v-list-item-content>
                <v-list-item-title>Add Sports Record</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item-action>
    </v-list-item>
    <v-row class="mb-2 hidden-sm-and-down">
      <v-col v-if="canManageSportsRecords" sm="12" md="5">
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
      <v-col class="order-md-first" sm="12" md="7">
        <FxSportsRecordsFilter v-model="query" :events="events" :sports="sports" />
      </v-col>
    </v-row>
    <FxSportsRecordDialog v-if="selectedItem" :item="selectedItem" :value="openDialog" @click:back="closeRecord" />
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
        mobile-breakpoint="0"
        @click:row="openRecord"
      >
        <template #item.event="{ item }">
          <v-list-item class="px-0">
            <v-list-item-avatar v-if="item.sport.icon && !isMobile">
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
          <v-list-item class="px-0">
            <v-list-item-content>
              <v-list-item-title>
                <span v-if="item.student">{{ item.student.firstname }} {{ item.student.lastname }}</span>
                <span v-else>{{ item.studentName }}</span>
              </v-list-item-title>
              <v-list-item-subtitle v-if="isMobile">
                {{ item.sportsRecordCategory.name }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template #item.date="{ item }">
          <FxDateFormat :date="item.date" output-format="dd-MM-yyyy" class="text-no-wrap" />
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
import pick from 'lodash/pick'
import FxSportsRecordsFilter from '@/components/PageComponents/FxSportsRecords/FxSportsRecordsFilter'
import FxSportsRecordsFilterDialog from '@/components/PageComponents/FxSportsRecords/FxSportsRecordsFilterDialog'
import FxSportsRecordDialog from '@/components/PageComponents/FxSportsRecords/FxSportsRecordDialog'

export default {
  name: 'RecordsPage',
  components: { FxSportsRecordDialog, FxSportsRecordsFilterDialog, FxSportsRecordsFilter },

  async asyncData ({ store }) {
    const contextSchoolId = store.getters['context/schoolId']
    const events = await store.dispatch('api/sportsRecordEvents/list', { schoolId: contextSchoolId })
    const sports = [...new Map(events.map(event => [event.sportId, event.sport])).values()]

    return {
      events,
      sports,
    }
  },
  data: () => ({
    items: [],
    query: {
      page: 1,
      orderBy: 'date',
      orderDesc: true,
      date: null,
    },
    meta: { total: 0 },
    sports: [],
    events: [],
    selectedItem: null,
    openDialog: false,
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
      isMobileDevice: 'context/isMobile',
    }),
    formattedDate () {
      return this.query.date ? DateTime.fromISO(this.query.date).toFormat('dd-MM-yyyy') : ''
    },
    isMobile () {
      if (process.client) {
        return this.$vuetify.breakpoint.xsOnly
      }

      return this.isMobileDevice
    },
    headers () {
      return [
        {
          text: 'Event',
          sortable: false,
          value: 'event',
        },
        ...(this.isMobile ? [] : [{ text: 'Category', value: 'category', sortable: false }]),
        { text: 'Student', value: 'student', sortable: false },
        { text: 'Record/Score', value: 'score' },
        { text: 'Date', value: 'date' },
        ...(this.canManageSportsRecords ? [{ text: 'Action', value: 'action', sortable: false }] : []),
      ]
    },

    selectedFilters () {
      return Object.values(pick(this.query, ['sportId', 'sportsRecordEventId', 'sportsRecordCategoryId', 'date']))
        .filter(val => !!val)
        .length
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

    openRecord (item) {
      if (!this.isMobile) {
        return
      }
      this.selectedItem = item
      this.openDialog = true
    },

    closeRecord () {
      this.openDialog = false
    },

    clearAll () {
      this.query = {
        ...this.query,
        sportId: null,
        sportsRecordEventId: null,
        sportsRecordCategoryId: null,
        date: null,
      }
    },
  },
}
</script>

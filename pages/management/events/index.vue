<template>
  <v-row>
    <v-col>
      <v-list color="info lighten-4" class="mb-2">
        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title class="text-h4">
              Events
            </v-list-item-title>
            <v-list-item-subtitle class="subtitle-1 text--info text--darken-2">
              {{ meta.total }} Events in database
            </v-list-item-subtitle>
          </v-list-item-content>
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
          <template #item.date="{ item }">
            <FxDateFormat :date="item.date" output-format="dd/MM/yyyy" />
          </template>

          <template #item.school1="{ item }">
            <v-list-item v-if="item.participants[0].school" class="px-0">
              <v-list-item-content class="text-right">
                <v-list-item-title>
                  {{ item.participants[0].school.name }}
                </v-list-item-title>
                <v-list-item-subtitle v-if="item.participants[0].team">
                  {{ item.participants[0].team.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar>
                <FxSchoolLogo :value="item.participants[0].school.logo" :color="item.participants[0].school.color" />
              </v-list-item-avatar>
            </v-list-item>
          </template>

          <template #item.result="{ item }">
            <div style="height: 100%; width: 100%; background-color: var(--v-info-lighten3)" class="px-9 d-flex align-center justify-center">
              <span v-if="item.participants[0].results" class="text-no-wrap">{{ item.participants[0].results[0].score }} - {{ item.participants[0].results[0].opponentScore }}</span>
            </div>
          </template>

          <template #item.school2="{ item }">
            <v-list-item v-if="item.participants[1] && item.participants[1].school" class="px-0">
              <v-list-item-avatar>
                <FxSchoolLogo :value="item.participants[1].school.logo" :color="item.participants[1].school.color" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.participants[1].school.name }}
                </v-list-item-title>
                <v-list-item-subtitle v-if="item.participants[1].team">
                  {{ item.participants[1].team.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template #item.action="{ item }">
            <v-btn link icon :to="{ name: 'management-events-id', params: { id: item.id } }">
              <v-icon>$vuetify.icons.edit</v-icon>
            </v-btn>
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
import { EventType } from '@/enum'
import FxSchoolLogo from '@/components/FxSchoolLogo/FxSchoolLogo'

export default {
  name: 'AdminEventsPage',
  components: { FxSchoolLogo },
  layout: 'admin',
  data: () => ({
    headers: [
      {
        text: 'Date',
        value: 'date',
        sortable: false,
      },
      { text: 'Sport', value: 'sport.name', sortable: false },
      { text: 'School & Team', value: 'school1', sortable: false, align: 'end', class: 'text-right' },
      { text: 'Result', value: 'result', sortable: false },
      { text: 'School & Team', value: 'school2', sortable: false },
      { text: 'Action', value: 'action', sortable: false },
    ],
    items: [],
    query: {
      page: 1,
      orderBy: 'name',
      orderDesc: false,
    },
    meta: { total: 0 },
    EventType,
    loading: false,
  }),

  async fetch () {
    this.loading = true
    try {
      const { data, meta } = await this.$store.dispatch('api/management/events/list', this.query)
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

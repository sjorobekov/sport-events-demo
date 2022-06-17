<template>
  <v-card flat outlined>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Events</v-list-item-title>
        <v-list-item-subtitle>{{ meta.total }} Events</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn outlined color="brand" :to="{ name: 'management-schools-id-events-add' }" link>
          <v-icon>$vuetify.icons.plusOutline</v-icon>Create Event
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
          <FxSportName :sport-id="item.sportId" />
        </template>
        <template #item.team="{ item }">
          <FxTeamName :school-id="item.me.schoolId" :team-id="item.me.teamId" />
        </template>
        <template #item.opponent="{ item }">
          <FxOpponentName
            v-if="item.opponent"
            :context-school-id="contextSchoolId"
            :opponent-school-id="item.opponent.schoolId"
            :opponent-id="item.opponent.listedAsOpponentId"
          />
          <span v-else>{{ item.name }}</span>
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
              <v-list-item @click="remove(item)">
                <v-list-item-content>
                  <v-list-item-title class="text--info text--darken-1">
                    Delete Event
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
  name: 'SchoolUsers',
  layout: 'admin',

  data: () => ({
    headers: [
      {
        text: 'Date & Time',
        value: 'date',
      },
      { text: 'Sport', value: 'sport' },
      { text: 'Team', value: 'team' },
      { text: 'Opponent/Event', value: 'opponent' },
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
      const { data, meta } = await this.$store.dispatch('api/events/getBySchool', {
        schoolId: this.contextSchoolId,
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
      contextSchoolId: 'admin/page/school/id',
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

  methods: {
    remove (item) {
      if (!confirm('Are you sure?')) {
        return
      }

      this.$store.dispatch('api/events/remove', {
        id: item.id,
        schoolId: item.me.schoolId,
      }).then(() => {
        this.$fetch()
        this.$toast('Event has been removed')
      }).catch(() => {
        this.$toast.error('Unknown Error')
      })
    },
  },
}
</script>

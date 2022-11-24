<template>
  <div>
    <v-card flat outlined>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h4">
            In-House Sport Teams
          </v-list-item-title>
          <v-list-item-subtitle />
        </v-list-item-content>
        <v-list-item-action>
          <v-btn outlined color="brand" :to="{ name: 'management-schools-id-in-house-teams-add' }" link>
            <v-icon>$vuetify.icons.plusOutline</v-icon>Add Team
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <client-only>
        <v-data-table
          :headers="teamsHeaders"
          :items="teams"
          hide-default-footer
          disable-pagination
        >
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
                <v-list-item link :to="{ name: 'management-schools-id-in-house-teams-teamId', params: { teamId: item.id } }">
                  <v-list-item-content>
                    <v-list-item-title class="text--info text--darken-1">
                      Edit Team
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="removeTeam(item)">
                  <v-list-item-content>
                    <v-list-item-title class="text--info text--darken-1">
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
    <v-card flat outlined class="mt-5">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h4">
            In-House Sport Events
          </v-list-item-title>
          <v-list-item-subtitle />
        </v-list-item-content>
      </v-list-item>
      <client-only>
        <v-data-table
          :headers="eventMatchesHeaders"
          :items="eventMatches"
          :server-items-length="meta.total"
          hide-default-footer
          :sort-by.sync="query.orderBy"
          :sort-desc.sync="query.orderDesc"
          :page="query.page"
          must-sort
        >
          <template #item.sport="{ item }">
            <span>{{ item.inHouseEvent.inHouseCompetition.sport.name }}</span>
          </template>
          <template #item.competition="{ item }">
            <span>{{ item.inHouseEvent.inHouseCompetition.name }}</span>
          </template>
          <template #item.team="{ item }">
            <span>{{ item.homeTeam.name }}</span>
          </template>
          <template #item.awayTeam="{ item }">
            <span>{{ item.awayTeam.name }}</span>
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
                <v-list-item
                  link
                  :to="{
                    name: 'management-schools-id-in-house-competitions-competitionId-matches-matchId',
                    params: { competitionId: item.inHouseEvent.inHouseCompetition.id, matchId: item.id }
                  }"
                >
                  <v-list-item-content>
                    <v-list-item-title class="text--info text--darken-1">
                      Edit Match
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
        <v-pagination
          v-if="meta.total > 5"
          v-model.lazy="query.page"
          :length="meta.lastPage"
        />
      </client-only>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'AdminInHouseSportsPage',
  layout: 'admin',
  data: () => ({
    teamsHeaders: [
      {
        text: 'House Team Name',
        sortable: true,
        value: 'name',
      },
      { text: 'Action', value: 'action', sortable: false },
    ],
    eventMatchesHeaders: [
      {
        text: 'Date & Time',
        value: 'date',
      },
      { text: 'Sport', value: 'sport' },
      { text: 'Comp. Name', value: 'competition' },
      { text: 'House Team', value: 'team' },
      { text: 'House Team', value: 'awayTeam' },
      { text: 'Action', value: 'action', sortable: false },
    ],
    query: {
      page: 1,
      orderBy: 'date',
      orderDesc: false,
      limit: 5,
    },
    meta: { total: 0 },
    teams: [],
    eventMatches: [],
    loading: false,
  }),

  async fetch () {
    this.loading = true
    try {
      this.teams = await this.$store.dispatch('api/inHouseTeams/list', {
        schoolId: this.$route.params.id,
      })
      const { data, meta } = await this.$store.dispatch('api/inHouseMatches/getBySchool', {
        schoolId: this.$route.params.id,
        params: this.query,
      })
      this.eventMatches = data
      this.meta = meta
    } finally {
      this.loading = false
    }
  },
  head: () => ({ title: 'In-House Sports' }),

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
    removeTeam (item) {
      if (!confirm('Are you sure?')) {
        return
      }

      this.$store.dispatch('api/inHouseTeams/remove', item).then(() => {
        const index = this.teams.indexOf(item)
        this.teams.splice(index, 1)
      }).catch(() => {
        this.$toast.error('Unknown Error')
      })
    },
  },
  removeEvent (item) {
    if (!confirm('Are you sure?')) {
      return
    }

    this.$store.dispatch('api/inHouseMatches/remove', item).then(() => {
      const index = this.eventMatches.indexOf(item)
      this.eventMatches.splice(index, 1)
    }).catch(() => {
      this.$toast.error('Unknown Error')
    })
  },
}
</script>

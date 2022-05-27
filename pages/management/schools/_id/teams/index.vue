<template>
  <v-card flat outlined>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h4">
          Teams
        </v-list-item-title>
        <v-list-item-subtitle />
      </v-list-item-content>
      <v-list-item-action>
        <v-btn outlined color="brand" :to="{ name: 'management-schools-id-teams-add' }" link>
          <v-icon>$vuetify.icons.plusOutline</v-icon>Add Team
        </v-btn>
      </v-list-item-action>
    </v-list-item>
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
              <v-list-item @click="remove(item)">
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
</template>

<script>
export default {
  name: 'AdminSchoolTeamsPage',
  layout: 'admin',
  data: () => ({
    headers: [
      { text: 'Sport', value: 'sport' },
      { text: 'Gender', value: 'gender' },
      { text: 'Age', value: 'age' },
      { text: 'Ability', value: 'ability' },
      { text: 'Coach', value: 'coach' },
      { text: 'Privacy', value: 'privacy' },
      { text: '', value: 'action', sortable: false },
    ],
    items: [],
    loading: false,
  }),

  async fetch () {
    this.loading = true
    try {
      this.items = await this.$store.dispatch('api/teams/list', {
        schoolId: this.$route.params.id,
      })
    } finally {
      this.loading = false
    }
  },
  head: () => ({ title: 'Teams' }),

  methods: {
    remove (item) {
      if (!confirm('Are you sure?')) {
        return
      }

      this.$store.dispatch('api/teams/remove', item).then(() => {
        const index = this.items.indexOf(item)
        this.items.splice(index, 1)
      }).catch(() => {
        this.$toast.error('Unknown Error')
      })
    },
  },
}
</script>

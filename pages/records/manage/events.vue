<template>
  <v-card flat outlined>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h4">
          Sports & Events
        </v-list-item-title>
        <v-list-item-subtitle />
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          depressed
          dark
          color="primary"
          link
          :to="{ name: 'records-events-add' }"
        >
          <v-icon>$vuetify.icons.plusOutline</v-icon>Add New Record Event
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
        <template #item.sport="{ item }">
          <FxSportName :sport-id="item.sportId" />
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
              <v-list-item link :to="{ name: 'records-events-id', params: { id: item.id } }">
                <v-list-item-content>
                  <v-list-item-title class="text--info text--darken-1">
                    Edit Event
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
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
    </client-only>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'RecordsManageEvents',
  data: () => ({
    headers: [
      {
        text: 'Sport',
        sortable: false,
        value: 'sport',
      },
      {
        text: 'Event',
        sortable: true,
        value: 'name',
      },
      { text: 'Action', value: 'action', sortable: false },
    ],
    items: [],
    loading: false,
  }),

  async fetch () {
    this.loading = true
    try {
      this.items = await this.$store.dispatch('api/sportsRecordEvents/list', {
        schoolId: this.schoolId,
      })
    } finally {
      this.loading = false
    }
  },

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },

  methods: {
    remove (item) {
      if (!confirm('Are you sure?')) {
        return
      }

      this.$store.dispatch('api/sportsRecordEvents/remove', item).then(() => {
        const index = this.items.indexOf(item)
        this.items.splice(index, 1)
      }).catch(() => {
        this.$toast.error('Unknown Error')
      })
    },
  },
}
</script>

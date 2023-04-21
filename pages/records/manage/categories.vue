<template>
  <div>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="text-h4">
          Categories
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          depressed
          dark
          color="primary"
          link
          :ripple="false"
          :to="{ name: 'records-categories-add' }"
        >
          <v-icon class="mr-0 mr-md-1">
            $vuetify.icons.add-all
          </v-icon>
          <span class="hidden-sm-and-down">Add New Record Category</span>
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-card>
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
                <v-btn icon v-bind="attrs" :ripple="false" v-on="on">
                  <v-icon color="neutral darken-1">
                    $vuetify.icons.threeDots
                  </v-icon>
                </v-btn>
              </template>
              <v-list class="grey lighten-3">
                <v-list-item link :to="{ name: 'records-categories-id', params: { id: item.id } }" :ripple="false">
                  <v-list-item-content>
                    <v-list-item-title class="neutral--text text--darken-3">
                      Edit Category
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :ripple="false" @click="remove(item)">
                  <v-list-item-content>
                    <v-list-item-title class="neutral--text text--darken-3">
                      Delete Category
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </client-only>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'RecordsManageCategories',
  data: () => ({
    headers: [
      {
        text: 'Category',
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
      this.items = await this.$store.dispatch('api/sportsRecordCategories/list', {
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

      this.$store.dispatch('api/sportsRecordCategories/remove', item).then(() => {
        const index = this.items.indexOf(item)
        this.items.splice(index, 1)
      }).catch(() => {
        this.$toast.error('Unknown Error')
      })
    },
  },
}
</script>

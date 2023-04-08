<template>
  <v-row>
    <v-col>
      <v-list color="info lighten-4" class="mb-2">
        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title class="text-h3">
              Tariff Plans
            </v-list-item-title>
            <v-list-item-subtitle class="text-p2 text--info text--darken-2">
              {{ sports.length }} records
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn dark color="brand" depressed @click="refresh">
              <v-icon>mdi-refresh</v-icon>Refresh
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-data-iterator
        :items="sports"
        item-key="id"
        hide-default-footer
        disable-pagination
      >
        <template #default="{ items }">
          <v-row>
            <v-col
              v-for="item in items"
              :key="item.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.paddleData.name }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-menu>
                      <template #activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon>$vuetify.icons.threeDots</v-icon>
                        </v-btn>
                      </template>
                      <v-list class="grey lighten-3">
                        <v-list-item link :to="{ name: 'management-tariff-plans-id', params: { id: item.id }}">
                          <v-list-item-title>Edit Plan</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="remove(item.id)">
                          <v-list-item-title class="error--text text--darken-2">
                            Delete Plan
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'FxTariffPlansPage',
  layout: 'admin',
  data: () => ({
    sports: [],
  }),

  async fetch () {
    this.sports = await this.$store.dispatch('api/tariffPlans/list')
  },
  head: () => ({ title: 'Tariff Plans' }),

  methods: {
    async refresh () {
      this.sports = await this.$store.dispatch('api/tariffPlans/refresh')
    },
    remove (id) {
      if (!confirm('Are you sure?')) {
        return
      }

      this.$store.dispatch('api/tariffPlans/remove', id).then(() => {
        this.sports = this.sports.filter(item => item.id !== id)
      }).catch(() => {
        this.$toast.error('Unknown Error')
      })
    },
  },
}
</script>

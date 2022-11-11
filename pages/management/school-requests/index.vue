<template>
  <v-row>
    <v-col>
      <v-list color="info lighten-4" class="mb-2">
        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title class="text-h4">
              Schools Requests
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-card flat outlined>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-default-footer
          disable-pagination
        >
          <template #item.address="{ item }">
            <div class="d-flex justify-space-between">
              <span>{{ item.city }} {{ item.country }}</span>
              <div>
                <v-btn v-if="item.website" icon :href="item.website" exact link>
                  <v-icon>mdi-link-variant</v-icon>
                </v-btn>
                <v-btn v-if="item.email" icon :href="`mailto:${item.email}`">
                  <v-icon>mdi-email-outline</v-icon>
                </v-btn>
              </div>
            </div>
          </template>
          <template #item.action="{ item, index }">
            <v-btn color="success" @click="approve(item.id, index)">
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>Approve
            </v-btn>
            <v-btn color="error" @click="reject(item.id, index)">
              <v-icon>mdi-close-circle-outline</v-icon>Reject
            </v-btn>
            <v-btn outlined :to="{ name: 'management-school-requests-id', params: { id: item.id } }">
              <v-icon>mdi-square-edit-outline</v-icon>Edit
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { SchoolRequestStatus } from '~/enum'

export default {
  name: 'SchoolListPage',
  components: {
  },
  layout: 'admin',
  data: () => ({
    headers: [
      {
        text: 'School',
        align: 'start',
        sortable: true,
        value: 'name',
      },
      { text: 'Address', value: 'address', width: '30%' },
      { text: 'Action', value: 'action', sortable: false, width: '35%' },
    ],
    items: [],
    loading: false,
    formData: {
      portal: false,
      portalAddress: '',
    },
  }),

  async fetch () {
    this.loading = true
    try {
      this.items = await this.$store.dispatch('api/schoolRequests/list', {
        params: { status: SchoolRequestStatus.PENDING },
      })
    } finally {
      this.loading = false
    }
  },

  head () {
    return {
      title: 'Schools Requests',
    }
  },

  methods: {
    async approve (id, index) {
      if (!confirm('Are you sure to approve?')) {
        return
      }
      this.loading = true
      try {
        const request = await this.$store.dispatch('api/schoolRequests/confirmation', {
          id,
          status: SchoolRequestStatus.APPROVED,
        })
        delete request.id
        this.formData = { ...this.formData, ...request }
        await this.$store.dispatch('api/schools/save', this.formData)
        this.items.splice(index, 1)
      } catch (e) {
        this.$toast.error('Unknown Error')
      } finally {
        this.loading = false
      }
    },
    async reject (id) {
      if (!confirm('Are you sure to reject?')) {
        return
      }
      this.loading = true
      await this.$store.dispatch('api/schoolRequests/confirmation', {
        id,
        status: SchoolRequestStatus.REJECTED,
      }).then(() => {
        this.items.splice(index, 1)
      }).catch(() => {
        this.$toast.error('Unknown Error')
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

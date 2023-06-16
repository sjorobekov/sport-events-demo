<template>
  <div>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="text-h4 neutral--text text--darken-4">
          Students
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn depressed dark color="primary" :to="{ name: 'settings-students-add' }" link>
          <v-icon>$vuetify.icons.add-all</v-icon>Add Student
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-card>
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
          <template #item.gender="{ item }">
            <FxGender :value="item.gender" />
          </template>
          <template #item.birthday="{ item }">
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <FxAge :birthday="item.birthday" />
                </span>
              </template>
              <span>{{ item.birthday }}</span>
            </v-tooltip>
          </template>
          <template #item.action="{ item }">
            <v-menu>
              <template #activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon color="neutral darken-1">
                    $vuetify.icons.threeDots
                  </v-icon>
                </v-btn>
              </template>
              <v-list class="grey lighten-3">
                <v-list-item link :to="{ name: 'settings-students-studentId', params: { studentId: item.id } }">
                  <v-list-item-content>
                    <v-list-item-title class="neutral--text text--darken-3">
                      Edit Student
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="remove(item)">
                  <v-list-item-content>
                    <v-list-item-title class="neutral--text text--darken-3">
                      Delete Student
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxGender from '@/components/FxGender'
import FxAge from '@/components/FxAge'

export default {
  name: 'SchoolStudents',
  components: { FxGender, FxAge },
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canManageStudents'],
  },
  data: () => ({
    headers: [
      { text: 'First Name', value: 'firstname' },
      { text: 'Last Name', value: 'lastname' },
      { text: 'Age', value: 'birthday' },
      { text: 'Year Group', value: 'yearGroup' },
      { text: 'Gender', value: 'gender' },
      { text: 'House', value: 'houseTeam.name', sortable: false },
      { text: 'Action', value: 'action', sortable: false },
    ],
    items: [],
    query: {
      page: 1,
      orderBy: 'firstname',
      orderDesc: false,
    },
    meta: { total: 0 },
    loading: false,
  }),

  async fetch () {
    this.loading = true
    try {
      const { data, meta } = await this.$store.dispatch('api/students/list', {
        schoolId: this.schoolId,
        params: this.query,
      })
      this.items = data
      this.meta = meta
    } finally {
      this.loading = false
    }
  },
  head: () => ({ title: 'Students' }),

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
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

      this.$store.dispatch('api/students/remove', item).then(() => {
        this.$fetch()
        this.$toast('Student has been deleted')
      }).catch(() => {
        this.$toast.error('Unknown Error')
      })
    },
  },
}
</script>
<style scoped>
.theme--light.v-data-table {
  color: var(--v-neutral-darken4);
}
</style>

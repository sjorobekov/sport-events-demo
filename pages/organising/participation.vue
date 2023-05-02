<template>
  <v-container class="mt-1 mt-md-n4">
    <h1 class="text-h4s text-md-h3 mb-6">
      Participation
    </h1>

    <FxParticipationPageCard />

    <v-row class="mt-5">
      <v-col cols="12" sm="6" md="3" class="py-0">
        <FxYearGroupSelect clearable icon="$vuetify.icons.students-small" @input="update('yearGroup', $event)" />
      </v-col>
      <v-col cols="12" sm="6" md="3" class="py-0">
        <FxGenderSelect clearable icon="$vuetify.icon.gender" @input="update('gender', $event)" />
      </v-col>
      <v-col cols="12" sm="6" md="3" class="py-0">
        <FxSportSelect clearable icon="$vuetify.icon.sports-small" @input="update('sportId', $event)" />
      </v-col>
      <v-col cols="12" sm="6" md="3" class="py-0">
        <v-text-field
          placeholder="Search"
          prepend-inner-icon="$vuetify.icon.magnifying-glass"
          outlined
          dense
          @input="update('search', $event)"
        />
      </v-col>
    </v-row>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-0"
        :loading="loading"
        :server-items-length="meta.total"
        :sort-by.sync="query.orderBy"
        :sort-desc.sync="query.orderDesc"
        :page.sync="query.page"
        :items-per-page.sync="query.limit"
      >
        <template #item.firstname="{ item }">
          {{ item.firstname }} {{ item.lastname }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapGetters } from 'vuex'
import FxParticipationPageCard from '@/components/PageComponents/FxParticipationPage/FxParticipationPageCard'
import FxSportSelect from '~/components/FxSportSelect.vue'
import FxYearGroupSelect from '~/components/FxYearGroupSelect.vue'

export default {
  name: 'ParticipationPage',
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canSeeOrganising'],
  },
  components: {
    FxParticipationPageCard,
    FxSportSelect,
    FxYearGroupSelect,
  },
  data: () => ({
    loading: false,
    headers: [
      {
        text: 'Student',
        align: 'start',
        sortable: true,
        value: 'firstname',
      },
      { text: 'Year Group', value: 'yearGroup' },
      { text: 'Gender', value: 'gender' },
      { text: 'Sports', value: 'sports' },
      { text: 'Team Events', value: 'events' },
      { text: 'Team Training', value: 'trainings' },
      { text: 'In-House Events', value: 'inHouseEvents' },
      { text: 'Total Events', value: 'totalEvents' },
    ],
    items: [],
    query: {
      page: 1,
      orderBy: 'firstname',
      orderDesc: false,
      limit: 10,
      search: '',
    },
    meta: { total: 0 },
  }),

  fetch () {
    this.fetchData()
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
  },

  watch: {
    query: {
      async handler () {
        await this.$router.push({ query: this.query })
        this.fetchData()
      },
      deep: true,
    },
  },

  methods: {
    fetchData: debounce(async function () {
      this.loading = true
      try {
        const { data, meta } = await this.$store.dispatch('api/students/getParticipation', {
          ...this.query,
          schoolId: this.contextSchoolId,
        })
        this.items = data
        this.meta = meta
      } finally {
        this.loading = false
      }
    }, 500),
    update (key, value) {
      this.query = { ...this.query, [key]: value }
    },
  },
}
</script>

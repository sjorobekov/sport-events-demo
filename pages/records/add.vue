<template>
  <div>
    <h3 class="text-h3 mb-6 neutral--text text--darken-4">
      Add Sports Record
    </h3>
    <FxRecordForm
      ref="form"
      v-model="formData"
      :sports="sports"
      :events="events"
      :categories="categories"
      :students="students"
      :disabled="loading"
    />

    <v-container class="mt-4 mb-8">
      <v-row>
        <v-spacer />
        <v-btn outlined :ripple="false" color="neutral darken-3" @click="cancel">
          Cancel
        </v-btn>
        <v-btn
          depressed
          color="primary"
          dark
          class="ml-2"
          :loading="loading"
          :ripple="false"
          @click="save"
        >
          <v-icon>$vuetify.icons.save</v-icon>Save
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxRecordForm from '~/components/FxRecordForm'

export default {
  name: 'RecordsAddPage',
  components: { FxRecordForm },
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canManageSportsRecords'],
  },

  async asyncData ({ store }) {
    const schoolId = store.getters['context/schoolId']
    const [events, categories, { data: students }] = await Promise.all([
      store.dispatch('api/sportsRecordEvents/list', { schoolId }),
      store.dispatch('api/sportsRecordCategories/list', { schoolId }),
      store.dispatch('api/students/list', {
        schoolId,
        params: { limit: -1, orderDesc: false },
      }),
    ])

    const sports = events.map(item => item.sport)

    return {
      events,
      categories,
      sports,
      students,
    }
  },

  data: () => ({
    formData: {},
    loading: false,
    sports: [],
    events: [],
    categories: [],
    students: [],
  }),
  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },
  watch: {
    'formData.sportId': {
      async handler (sportId) {
        this.events = await this.$store.dispatch('api/sportsRecordEvents/list', { schoolId: this.schoolId, params: { sportId } })
      },
      deep: true,
    },
  },

  methods: {
    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()
      if (!isValid) {
        this.loading = false
        return
      }
      this.$store.dispatch('api/sportsRecords/save', {
        schoolId: this.schoolId,
        ...this.formData,
      }).then(() => {
        this.$router.push({ name: 'records' })
      }).finally(() => {
        this.loading = false
      })
    },
    cancel () {
      this.$router.push({ name: 'records' })
    },
  },
}
</script>

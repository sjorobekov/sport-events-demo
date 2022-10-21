<template>
  <div>
    <h3 class="text-h3 mb-6">
      Edit Sports Record
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
        <v-btn outlined @click="cancel">
          Cancel
        </v-btn>
        <v-btn
          depressed
          color="primary"
          dark
          class="ml-2"
          :loading="loading"
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
  data: () => ({
    formData: {},
    loading: false,
    sports: [],
    events: [],
    categories: [],
    students: [],
  }),
  async fetch () {
    this.formData = await this.$store.dispatch('api/sportsRecords/get', {
      schoolId: this.schoolId,
      id: this.$route.params.id,
    })
  },
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
  async beforeMount () {
    this.sports = await this.$store.dispatch('api/sports/list')
    this.events = await this.$store.dispatch('api/sportsRecordEvents/list', { schoolId: this.schoolId })
    this.categories = await this.$store.dispatch('api/sportsRecordCategories/list', { schoolId: this.schoolId })
    const { data } = await this.$store.dispatch('api/students/list', {
      schoolId: this.schoolId,
      params: { limit: -1, orderDesc: false },
    })
    this.students = data
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

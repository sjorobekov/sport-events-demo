<template>
  <div>
    <h3 class="text-h3 mb-6">
      Edit Sports Records Event
    </h3>
    <FxRecordsEventForm ref="form" v-model="formData" :sports="sports" :disabled="loading" />

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
import FxRecordsEventForm from '~/components/FxRecordsEventForm.vue'

export default {
  name: 'RecordsEventsEditPage',
  components: { FxRecordsEventForm },
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canManageSportsRecords'],
  },
  data: () => ({
    formData: {},
    loading: false,
    sports: [],
  }),
  async fetch () {
    this.formData = await this.$store.dispatch('api/sportsRecordEvents/get', {
      schoolId: this.schoolId,
      id: this.$route.params.id,
    })
  },
  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },
  async beforeMount () {
    this.sports = await this.$store.dispatch('api/sports/list')
  },
  methods: {
    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()
      if (!isValid) {
        this.loading = false
        return
      }
      this.$store.dispatch('api/sportsRecordEvents/save', {
        schoolId: this.schoolId,
        ...this.formData,
      }).then(() => {
        this.$router.push({ name: 'records-manage-events' })
      }).catch(() => {
        this.$toast.error('Unknown Error')
      }).finally(() => {
        this.loading = false
      })
    },
    cancel () {
      this.$router.push({ name: 'records-manage-events' })
    },
  },
}
</script>

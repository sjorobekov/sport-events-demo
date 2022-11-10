<template>
  <div>
    <h3 class="text-h3 mb-6">
      Edit Sports Records Category
    </h3>
    <FxRecordsCategoryForm ref="form" v-model="formData" :disabled="loading" />

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
import FxRecordsCategoryForm from '~/components/FxRecordsCategoryForm.vue'

export default {
  name: 'RecordsCategoryEditPage',
  components: { FxRecordsCategoryForm },
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canManageSportsRecords'],
  },
  data: () => ({
    formData: {},
    loading: false,
  }),
  async fetch () {
    this.formData = await this.$store.dispatch('api/sportsRecordCategories/get', {
      schoolId: this.schoolId,
      id: this.$route.params.id,
    })
  },
  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },
  methods: {
    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()
      if (!isValid) {
        this.loading = false
        return
      }
      this.$store.dispatch('api/sportsRecordCategories/save', {
        schoolId: this.schoolId,
        ...this.formData,
      }).then(() => {
        this.$router.push({ name: 'records-manage-categories' })
      }).catch(() => {
        this.$toast.error('Unknown Error')
      }).finally(() => {
        this.loading = false
      })
    },
    cancel () {
      this.$router.push({ name: 'records-manage-categories' })
    },
  },
}
</script>

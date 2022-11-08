<template>
  <div>
    <h3 class="text-h3 mb-6">
      Request Add School
    </h3>

    <FxRequestSchoolForm ref="form" v-model="formData" :disabled="loading" />

    <v-container class="mt-4 mb-8">
      <v-row>
        <v-spacer />
        <v-btn outlined @click="$router.back()">
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
          <v-icon size="20">
            mdi-content-save-outline
          </v-icon>Save
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxRequestSchoolForm from '@/components/FxRequestSchoolForm'

export default {
  name: 'FxRequestAddSchoolPage',
  components: {
    FxRequestSchoolForm,
  },
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canCreateOpponent'],
  },

  data: () => ({
    formData: {},
    loading: false,
  }),

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
      try {
        await this.$store.dispatch('api/schoolRequests/save', {
          schoolId: this.schoolId,
          ...this.formData,
        })
        this.$router.push({ name: 'directory-opponents' })
      } catch (e) {
        this.$toast.error('Unknown Error')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

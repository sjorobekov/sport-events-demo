<template>
  <div>
    <h3 class="text-h3 mb-6">
      Create New Team
    </h3>

    <FxTeamForm ref="form" v-model="formData" :disabled="loading" :sports="sports" :school-id="schoolId" />

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
          <v-icon>$vuetify.icons.save</v-icon>Save
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FxTeamForm from '@/components/FxTeamForm'

export default {
  name: 'SuperAdminTeamAddPage',
  components: {
    FxTeamForm,
  },
  layout: 'admin',
  data: () => ({
    formData: { },
    loading: false,
    sports: [],
  }),
  head: () => ({
    title: 'Create New Team',
  }),

  computed: {
    schoolId () {
      return this.$route.params.id
    },
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

      this.$store.dispatch('api/teams/save', {
        schoolId: this.schoolId,
        ...this.formData,
      }).then(() => {
        this.$router.push({ name: 'management-schools-id-teams' })
        this.$toast('Team has been created!')
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

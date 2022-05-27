<template>
  <div>
    <h3 class="text-h3 mb-6">
      {{ team.name }}
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
    team: {},
  }),

  async fetch () {
    this.team = await this.$store.dispatch('api/teams/get', {
      schoolId: this.$route.params.id,
      id: this.$route.params.teamId,
    })
    this.formData = {
      ...this.team,
    }
  },
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
      }).then((res) => {
        this.$toast('Team has been updated!')
        this.team = res
        this.formData = {
          ...res,
        }
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

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
import { mapGetters } from 'vuex'
import FxTeamForm from '@/components/FxTeamForm'

export default {
  name: 'TeamAddPage',
  components: {
    FxTeamForm,
  },

  data: () => ({
    formData: { seasonId: null },
    loading: false,
    sports: [],
  }),

  head: () => ({
    title: 'Create New Team',
  }),

  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canCreateTeam'],
  },

  computed: {
    ...mapGetters({
      currentSeason: 'seasons/current',
      schoolId: 'context/schoolId',
    }),
  },

  async beforeMount () {
    this.sports = await this.$store.dispatch('api/sports/list')
    this.formData.seasonId = this.currentSeason.id
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
      }).then((data) => {
        this.$router.push({ name: 'teams-id', params: { id: data.id } })
        this.$toast('Team has been created!')
      }).catch((err) => {
        if (err.response?.data?.error === 'already_exists') {
          this.$toast.error('Team already exists')
        } else {
          this.$toast.error('Unknown Error')
        }
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

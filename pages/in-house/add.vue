<template>
  <div>
    <h3 class="text-h3 mb-6">
      Create In-House Competition
    </h3>

    <FxInHouseCompetitionForm
      ref="form"
      v-model="formData"
      :disabled="loading"
      :sports="sports"
      :school-id="schoolId"
    >
      <template #alert>
        <v-alert v-if="!canCreateCompetition" class="alert">
          <template #prepend>
            <div class="alert-icon mr-3">
              <v-icon size="18" color="white" class="pa-1">
                mdi-alert-circle-outline
              </v-icon>
            </div>
          </template>
          <div class="text-p2 neutral--text text--darken-4">
            In-House Competition limit reached. Upgrade your plan to add more competitions.
          </div>
        </v-alert>
      </template>
    </FxInHouseCompetitionForm>

    <v-container class="mt-4 mb-8">
      <v-row>
        <v-spacer />
        <v-btn outlined @click="$router.back()">
          Cancel
        </v-btn>
        <v-btn
          depressed
          color="primary"
          class="ml-2"
          :loading="loading"
          :disabled="!canCreateCompetition"
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
import FxInHouseCompetitionForm from '@/components/FxInHouseCompetitionForm'

export default {
  name: 'InHouseCompetitionAddPage',
  components: {
    FxInHouseCompetitionForm,
  },
  data: () => ({
    formData: { },
    loading: false,
    sports: [],
    canCreateCompetition: true,
  }),
  head: () => ({
    title: 'Create New Competition',
  }),

  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canCreateCompetition'],
  },

  computed: {
    ...mapGetters({
      currentSeason: 'seasons/current',
      schoolId: 'context/schoolId',
    }),
  },

  watch: {
    formData (newVal, oldVal) {
      if (newVal.seasonId !== oldVal.seasonId) {
        this.checkLimitations(newVal.seasonId)
      }
    },
  },

  async beforeMount () {
    this.sports = await this.$store.dispatch('api/sports/list')
    this.formData = {
      seasonId: this.currentSeason.id,
    }
  },

  methods: {
    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()

      if (!isValid) {
        this.loading = false
        return
      }

      this.$store.dispatch('api/inHouseCompetitions/save', {
        schoolId: this.schoolId,
        ...this.formData,
      }).then((data) => {
        this.$router.push({ name: 'in-house-competitionId-matches', params: { competitionId: data.id } })
        this.$toast('Competition has been created!')
      }).finally(() => {
        this.loading = false
      })
    },

    async checkLimitations (seasonId) {
      const { canCreateCompetition } = await this.$store.dispatch('api/schools/getLimitations', {
        schoolId: this.schoolId,
        seasonId,
      })

      this.canCreateCompetition = canCreateCompetition
    },
  },
}
</script>

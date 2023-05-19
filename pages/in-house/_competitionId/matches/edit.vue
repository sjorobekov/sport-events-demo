<template>
  <div>
    <div class="d-flex">
      <h3 class="text-h3 mb-6 neutral--text text--darken-4">
        {{ inHouseCompetition.name }}
      </h3>
      <v-spacer />
    </div>

    <FxInHouseCompetitionForm ref="form" v-model="formData" :disabled="loading" :sports="sports" :school-id="schoolId" />

    <v-container class="mt-4 mb-8">
      <v-row>
        <v-spacer />
        <v-btn color="error darken-1" outlined @click="remove()">
          Delete Competition
      </v-btn>
        <v-btn outlined class="neutral--text text--darken-3 ml-2" @click="$router.back()">
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
    <FxConfirm ref="confirm" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxInHouseCompetitionForm from '@/components/FxInHouseCompetitionForm'

export default {
  name: 'InHouseCompetitionEditPage',
  components: {
    FxInHouseCompetitionForm,
  },

  data: () => ({
    formData: { },
    loading: false,
    sports: [],
    inHouseCompetition: {},
  }),

  async fetch () {
    this.inHouseCompetition = await this.$store.dispatch('api/inHouseCompetitions/get', {
      id: this.$route.params.competitionId,
      schoolId: this.schoolId,
    })

    this.formData = {
      ...this.inHouseCompetition,
    }
  },

  head () {
    return {
      title: this.inHouseCompetition.name,
    }
  },

  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canEditCompetition'],
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

      this.$store.dispatch('api/inHouseCompetitions/save', {
        schoolId: this.contextSchoolId,
        ...this.formData,
      }).then((res) => {
        this.$toast.success('Saved changes')
        this.$router.push({ name: 'in-house-competitionId-matches', params: { competitionId: res.id } })
      }).finally(() => {
        this.loading = false
      })
    },
    async remove () {
      const warning = 'Warning: Continuing will permanently delete this competition. ' +
                      'However, events linked to this competition will still be retained in the database. ' +
                      'Are you sure you want to proceed?'

      if (!await this.$refs.confirm.open(warning, 'Delete Competition', 'Yes, Delete Competition')) {
        return
      }

      this.$store.dispatch('api/inHouseCompetitions/remove', this.inHouseCompetition).then(() => {
        this.$router.push({ name: 'in-house' })
      }).catch(() => {
        this.$toast.error('Unknown Error')
      })
    },
  },
}
</script>

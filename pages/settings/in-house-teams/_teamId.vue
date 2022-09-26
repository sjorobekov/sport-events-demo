<template>
  <div>
    <h3 class="text-h3 mb-6">
      Edit In-House Team
    </h3>

    <FxInHouseTeamForm ref="form" v-model="formData" :disabled="loading" />

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
import FxInHouseTeamForm from '@/components/FxInHouseTeamForm'

export default {
  name: 'InHouseTeamAddPage',
  components: {
    FxInHouseTeamForm,
  },
  data: () => ({
    formData: { },
    loading: false,
  }),
  async fetch () {
    this.formData = await this.$store.dispatch('api/inHouseTeams/get', {
      schoolId: this.contextSchoolId,
      id: this.$route.params.teamId,
    })
  },
  head: () => ({
    title: 'Edit In-House Team',
  }),
  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
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

      this.$store.dispatch('api/inHouseTeams/save', this.formData).then((res) => {
        this.formData = { ...res }
        this.$toast('Updated Successfully!')
      }).catch(() => {
        this.$toast.error('Unknown Error')
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

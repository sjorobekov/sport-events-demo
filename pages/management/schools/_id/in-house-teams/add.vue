<template>
  <div>
    <h3 class="text-h3 mb-6">
      Create In-House Team
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
import FxInHouseTeamForm from '@/components/FxInHouseTeamForm'

export default {
  name: 'InHouseTeamAddPage',
  components: {
    FxInHouseTeamForm,
  },
  layout: 'admin',
  data: () => ({
    formData: { },
    loading: false,
  }),
  head: () => ({
    title: 'Add In-House Team',
  }),
  methods: {
    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()

      if (!isValid) {
        this.loading = false
        return
      }

      this.$store.dispatch('api/inHouseTeams/save', {
        schoolId: this.$route.params.id,
        ...this.formData,
      }).then((res) => {
        this.$router.push({ name: 'management-schools-id-in-house-sports', params: { id: res.schoolId, teamId: res.id } })
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

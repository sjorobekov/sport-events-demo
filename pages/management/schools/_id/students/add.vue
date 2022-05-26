<template>
  <div>
    <h3 class="text-h3 mb-6">
      Add Student
    </h3>

    <FxStudentAddForm ref="form" v-model="formData" :disabled="loading" :in-house-teams="inHouseTeams" />

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
import FxStudentAddForm from '@/components/FxStudentAddForm'

export default {
  name: 'SuperAdminStudentAddPage',
  components: {
    FxStudentAddForm,
  },
  layout: 'admin',
  data: () => ({
    formData: { },
    loading: false,
    inHouseTeams: [],
  }),
  head: () => ({
    title: 'Add Student',
  }),

  async beforeMount () {
    this.inHouseTeams = await this.$store.dispatch('api/inHouseTeams/list', {
      schoolId: this.$route.params.id,
    })
  },
  methods: {
    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()

      if (!isValid) {
        this.loading = false
        return
      }

      this.$store.dispatch('api/students/save', {
        schoolId: this.$route.params.id,
        ...this.formData,
      }).then((res) => {
        this.$router.push({ name: 'management-schools-id-students', params: { id: res.schoolId } })
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

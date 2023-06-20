<template>
  <div>
    <h3 class="text-h4 my-3 neutral--text text--darken-4 font-weight-bold">
      Add Student
    </h3>

    <FxStudentAddForm ref="form" v-model="formData" :disabled="loading" :in-house-teams="inHouseTeams" />

    <v-container class="mt-4 mb-8">
      <v-row>
        <v-spacer />
        <v-btn outlined color="neutral darken-3" @click="$router.back()">
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
  name: 'FxStudentAddPage',
  components: {
    FxStudentAddForm,
  },

  props: {
    schoolId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    formData: { },
    loading: false,
    inHouseTeams: [],
  }),

  async beforeMount () {
    this.inHouseTeams = await this.$store.dispatch('api/inHouseTeams/list', {
      schoolId: this.schoolId,
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
        schoolId: this.schoolId,
        ...this.formData,
      }).then((res) => {
        this.$emit('created', res)
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

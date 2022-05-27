<template>
  <div>
    <div v-if="$fetchState.error">
      <h1 class="text--disabled">
        An error occurred :(
      </h1>
    </div>

    <div v-else>
      <h3 class="text-h4 mb-6">
        {{ student.firstname }} {{ student.lastname }}
      </h3>
      <v-card flat outlined>
        <v-card-title class="text-p3 font-weight-bold">
          Student Information
        </v-card-title>
        <v-divider />
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="5"
              class="pb-0"
            >
              <v-list class="py-0">
                <v-list-item>
                  <v-list-item-content class="info--text text-p2 py-0">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col
              cols="12"
              md="7"
              class="pb-0"
            >
              <FxStudentEditForm v-model="formData" :disabled="loading" :in-house-teams="inHouseTeams" />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="pt-0 mt-0 pa-3">
          <v-spacer />
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
        </v-card-actions>
      </v-card>

      <h3 class="text-p3 font-weight-bold mt-5 mb-1">
        Delete Student
      </h3>
      <v-divider class="mb-0" />
      <v-list-item class="px-0">
        <v-list-item-content>
          <v-list-item-title class="text-p2 info--text">
            Delete student from the Portal
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn depressed color="error" @click="remove">
            Delete Student
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuperAdminStudentEditPage',
  components: {},
  data: () => ({
    formData: {},
    inHouseTeams: [],
    student: {},
    loading: false,
  }),
  async fetch () {
    this.inHouseTeams = await this.$store.dispatch('api/inHouseTeams/list', {
      schoolId: this.$route.params.id,
    })
    this.student = await this.$store.dispatch('api/students/get', {
      id: this.$route.params.studentId,
      schoolId: this.$route.params.id,
    })

    this.formData = {
      ...this.student,
    }
  },
  head: () => ({ title: 'Edit Student' }),
  methods: {
    save () {
      this.loading = true
      this.$store.dispatch('api/students/save', this.formData)
        .then((res) => {
          this.student = {
            ...res,
          }
          this.$toast.success('Updated!')
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
        .finally(() => {
          this.loading = false
        })
    },

    remove () {
      if (!confirm('Are you sure?')) {
        return
      }

      this.$store.dispatch('api/students/remove', this.student)
        .then(() => {
          this.$toast.info('Student has been removed')
          this.$router.push({ name: 'management-schools-id-students' })
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
    },
  },
}
</script>

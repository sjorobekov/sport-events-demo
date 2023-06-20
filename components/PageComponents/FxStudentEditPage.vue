<template>
  <div>
    <div v-if="$fetchState.error">
      <h1 class="text--disabled">
        An error occurred :(
      </h1>
    </div>

    <div v-else>
      <h3 class="text-h4 py-3 neutral--text text--darken-4 font-weight-bold">
        {{ student.firstname }} {{ student.lastname }}
      </h3>
      <v-card class="px-6 pt-6 pb-8">
        <v-card-title class="text-p3 font-weight-bold px-0 pb-2">
          Student Information
        </v-card-title>
        <v-divider />
        <v-container>
          <v-row>
            <v-col
              cols="12"
              lg="5"
              class="pb-0 px-0"
            >
              <v-list class="py-0">
                <v-list-item class="px-0">
                  <v-list-item-content class="neutral--text text--darken-3 text-p2 py-0 pr-5 pb-3">
                    Manage student information here. You can edit the name, date of birth, year group, gender and house team.
                    <br>Please note that this change will not be reflected in other school systems if you are using integrations.
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col
              cols="12"
              lg="7"
              class="pb-0 px-0"
            >
              <FxStudentEditForm v-model="formData" :disabled="loading" :in-house-teams="inHouseTeams" />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="pt-0 mt-0 pa-3 pr-0">
          <v-spacer />
          <v-btn
            depressed
            color="primary"
            dark
            class="ml-2 mt-4"
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
          <v-list-item-title class="text-p2 neutral--text text--darken-3">
            Delete this student. Please note that this action cannot be undone.
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
  name: 'FxStudentEditPage',

  props: {
    schoolId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    formData: {},
    inHouseTeams: [],
    student: {},
    loading: false,
  }),
  async fetch () {
    this.inHouseTeams = await this.$store.dispatch('api/inHouseTeams/list', {
      schoolId: this.schoolId,
    })
    this.student = await this.$store.dispatch('api/students/get', {
      id: this.$route.params.studentId,
      schoolId: this.schoolId,
    })

    this.formData = {
      ...this.student,
    }
  },

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
        .then((res) => {
          this.$toast.info('Student has been removed')
          this.$emit('remove', res)
        })
        .catch(() => {
          this.$toast.error('Unknown Error')
        })
    },
  },
}
</script>

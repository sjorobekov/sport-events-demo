<template>
  <v-row>
    <v-col>
      <h4 class="mb-6 text-h4">
        Create New School
      </h4>
      <v-card class="fx-card-border-top-brand2">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="5"
              >
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-avatar color="brand">
                        <span class="white--text text-h5">1</span>
                      </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>School Information</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-avatar />
                    <v-list-item-content class="text--disabled">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col
                cols="12"
                md="5"
              >
                <SchoolInfoForm ref="form1" v-model="formData" :disabled="loading" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>

      <v-card class="mt-4 fx-card-border-top-brand2">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="5"
              >
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-avatar color="brand">
                        <span class="white--text text-h5">2</span>
                      </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Fixturr Portal</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-avatar />

                    <v-list-item-content class="text--disabled">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col
                cols="12"
                md="5"
              >
                <SchoolPortalForm ref="form2" v-model="formData" :disabled="loading" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>

      <v-container class="mt-4 mb-8">
        <v-row>
          <v-spacer />
          <v-btn outlined @click="$router.back()">
            Cancel
          </v-btn>
          <v-btn
            depressed
            color="brand"
            dark
            class="ml-2"
            :loading="loading"
            @click="save"
          >
            <v-icon>$vuetify.icons.save</v-icon>Save
          </v-btn>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import SchoolInfoForm from '@/components/admin/FxSchoolInfoForm'
import SchoolPortalForm from '@/components/admin/FxSchoolPortalForm'

export default {
  name: 'SchoolAddPage',
  components: { SchoolInfoForm, SchoolPortalForm },
  layout: 'admin',
  data: () => ({
    formData: {
      portal: false,
      portalAddress: '',
      street: '',
      zip: '',
      city: '',
      country: '',
      website: '',
    },
    loading: false,
  }),

  head: () => ({
    title: 'Create New School',
  }),

  methods: {
    async save () {
      this.loading = true
      const isValid = await Promise.all([this.$refs.form1.validateAsync(), this.$refs.form2.validateAsync()])

      if (isValid.some(item => !item)) {
        this.loading = false
        return
      }

      this.$store.dispatch('api/schools/save', this.formData).then((res) => {
        this.$router.push({ name: 'management-schools-id', params: { id: res.id } })
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

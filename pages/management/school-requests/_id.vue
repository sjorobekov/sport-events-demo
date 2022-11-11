<template>
  <v-row>
    <v-col>
      <h4 class="mb-6 text-h4">
        Edit School Request
      </h4>
      <FxSteppedFormCard>
        <template #number>
          1
        </template>
        <template #title>
          School Information
        </template>
        <template #content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </template>
        <SchoolInfoForm ref="form1" v-model="formData" :disabled="loading" />
      </FxSteppedFormCard>

      <FxSteppedFormCard>
        <template #number>
          2
        </template>
        <template #title>
          Fixturr Portal
        </template>
        <template #content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </template>
        <SchoolPortalForm ref="form2" v-model="formData" :disabled="loading" />
      </FxSteppedFormCard>

      <v-container class="mt-4 mb-8">
        <v-row>
          <v-spacer />
          <v-btn outlined @click="$router.back()">
            Cancel
          </v-btn>
          <v-btn
            depressed
            color="success"
            dark
            class="ml-2"
            :loading="loading"
            @click="save"
          >
            <v-icon>$vuetify.icons.save</v-icon>Save & Approve
          </v-btn>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { SchoolRequestStatus } from '~/enum'
import SchoolInfoForm from '@/components/admin/FxSchoolInfoForm'
import SchoolPortalForm from '@/components/admin/FxSchoolPortalForm'

export default {
  name: 'SchoolEditRequestPage',
  components: { SchoolInfoForm, SchoolPortalForm },
  layout: 'admin',
  data: () => ({
    formData: {
      portal: false,
      portalAddress: '',
    },
    loading: false,
  }),

  async fetch () {
    const request = await this.$store.dispatch('api/schoolRequests/get', {
      id: this.$route.params.id,
    })
    delete request.id
    this.formData = { ...this.formData, ...request }
  },

  head: () => ({
    title: 'Edit School Request',
  }),

  methods: {
    async save () {
      this.loading = true
      const isValid = await Promise.all([this.$refs.form1.validateAsync(), this.$refs.form2.validateAsync()])

      if (isValid.some(item => !item)) {
        this.loading = false
        return
      }
      try {
        await this.$store.dispatch('api/schoolRequests/confirmation', {
          id: this.$route.params.id,
          status: SchoolRequestStatus.APPROVED,
        })

        const school = await this.$store.dispatch('api/schools/save', this.formData)
        this.$router.push({ name: 'management-schools-id', params: { id: school.id } })
      } catch (e) {
        this.$toast.error('Unknown Error')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

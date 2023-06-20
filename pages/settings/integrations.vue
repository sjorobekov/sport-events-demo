<template>
  <div>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="text-h4 neutral--text text--darken-4 font-weight-bold">
          Integrations
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-alert v-if="!canCreateIntegrations" class="alert">
      <template #prepend>
        <div class="alert-icon mr-3">
          <v-icon size="18" color="white" class="pa-1">
            mdi-alert-circle-outline
          </v-icon>
        </div>
      </template>
      Integrations are not supported on this plan. To access integrations, please upgrade your plan.
    </v-alert>

    <v-card class="py-2 px-2 py-md-6 px-md-6">
      <v-card-title class="px-0 text-p3 font-weight-bold pb-1">
        Xporter
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
            class="text-p2 neutral--text text--darken-3 px-0 pr-5"
          >
            To import data from your school MIS system, please enter your Xporter information. If you require assistance, please Contact Support.
          </v-col>
          <v-col
            cols="12"
            lg="7"
            class="pr-0"
          >
            <FxXportalForm ref="form" v-model="formData" :disabled="loading || !canCreateIntegrations" />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="pt-0 pr-0 mt-8">
        <v-spacer />
        <v-btn
          depressed
          color="primary"
          class="ml-2"
          :loading="loading"
          :disabled="!canCreateIntegrations"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import isEqual from 'lodash/isEqual'
import FxXportalForm from '@/components/FxXportalForm'

export default {
  name: 'IntegrationsPage',
  components: {
    FxXportalForm,
  },
  beforeRouteLeave (_to, _from, next) {
    if (!isEqual(this.original, this.formData)) {
      const answer = window.confirm('You have unsaved changes. Do you really want to leave?')
      if (!answer) {
        return false
      }
    }
    next()
  },

  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canManageIntegrations'],
  },

  data: () => ({
    formData: {},
    original: {},
    loading: false,
    school: {},
    canCreateIntegrations: true,
  }),

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
      season: 'seasons/current',
    }),
  },

  async created () {
    this.school = await this.$store.dispatch('api/schools/getXportal', this.schoolId)
    const { canCreateIntegrations } = await this.$store.dispatch('api/schools/getLimitations', {
      schoolId: this.schoolId,
      seasonId: this.season.id,
    })
    this.canCreateIntegrations = canCreateIntegrations
    this.formData = { ...this.school, id: this.schoolId }
    this.original = { ...this.formData }
  },

  methods: {
    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()

      if (!isValid) {
        this.loading = false
        return
      }

      this.$store.dispatch('api/schools/saveXportal', this.formData).then((res) => {
        this.formData = { ...res }
        this.original = { ...this.formData }

        this.$toast.success('Saved!')
      }).catch(() => {
        this.$toast.error('Unknown Error')
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

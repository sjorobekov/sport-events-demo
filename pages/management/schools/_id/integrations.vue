<template>
  <div>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="text-h4">
          Integrations
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card class="pb-8 px-6 pt-6">
      <v-card-title class="px-0 text-p3 font-weight-bold pb-1">
        Xportal
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="5"
            class="text-p2 info--text px-0"
          >
            Set Xportal Integration
          </v-col>
          <v-col
            cols="12"
            lg="7"
            class="pr-0"
          >
            <FxXportalForm ref="form" v-model="formData" :disabled="loading" />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="pt-0 pr-0 mt-8">
        <v-spacer />
        <v-btn
          depressed
          color="primary"
          dark
          class="ml-2"
          :loading="loading"
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
  name: 'SchoolIntegrationsPage',
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
  layout: 'admin',

  data: () => ({
    formData: {},
    original: {},
    loading: false,
    school: {},
  }),

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },

  async created () {
    this.school = await this.$store.dispatch('api/schools/getXportal', this.schoolId)
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

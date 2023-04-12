<template>
  <v-row>
    <v-col>
      <h3 class="mb-6 text-h3 mb-8">
        Edit Tariff Plan
      </h3>
      <v-card class="fx-card-border-top-brand2">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="5"
            >
              <FxInstructionItem>
                <template #number>
                  1
                </template>
                <template #title>
                  Tariff Plan Information
                </template>
                <template #content>
                  Select name of the sport and icon. Only svg files allowed
                </template>
              </FxInstructionItem>
            </v-col>
            <v-col
              cols="12"
              md="7"
            >
              <FxTariffPlanForm ref="form" v-model="formData" :disabled="loading" />
            </v-col>
          </v-row>
        </v-container>
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
import FxTariffPlanForm from '~/components/PageComponents/Management/TariffPlan/FxTariffPlanForm.vue'

export default {
  name: 'FxTariffPlanPage',
  components: { FxTariffPlanForm },
  layout: 'admin',
  async asyncData ({ store, route }) {
    const formData = await store.dispatch('api/tariffPlans/get', route.params.id)
    return {
      formData,
    }
  },
  data: () => ({
    formData: {},
    loading: false,
  }),

  methods: {
    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()

      if (!isValid) {
        this.loading = false
        return
      }

      this.$store.dispatch('api/tariffPlans/update', this.formData)
        .then((data) => {
          this.formData = data
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

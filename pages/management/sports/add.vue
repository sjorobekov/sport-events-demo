<template>
  <v-row>
    <v-col>
      <h3 class="mb-6 text-h3 mb-8">
        Add Sport
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
                  Sport Information
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
              <FxSportForm ref="form" v-model="formData" :disabled="loading" />
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
            color="brand2"
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
import FxSportForm from '@/components/admin/FxSportForm'

export default {
  name: 'SportAddPage',
  components: { FxSportForm },
  layout: 'admin',
  data: () => ({
    loading: false,
    formData: {},
  }),
  head: () => ({ title: 'Add Sport' }),
  methods: {
    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()

      if (!isValid) {
        this.loading = false
        return
      }

      this.$store.dispatch('api/sports/save', this.formData)
        .then((data) => {
          this.formData = data
          this.$router.push({ name: 'management-sports-id', params: { id: data.id } })
          this.$toast('Created Successfully!')
        }).catch(() => {
          this.$toast.error('Unknown Error')
        }).finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<template>
  <v-row>
    <v-col>
      <h4 class="mb-6 text-h4">
        Edit Sport
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
                <FxSportForm ref="form" v-model="formData" :disabled="loading" />
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
  name: 'SportEditPage',
  components: { FxSportForm },
  layout: 'admin',
  data: () => ({
    loading: false,
    formData: {},
  }),
  async fetch () {
    this.formData = await this.$store.dispatch('api/sports/get', this.$route.params.id)
  },
  head () {
    return {
      title: this.formData.name,
    }
  },
  methods: {
    async  save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()

      if (!isValid) {
        this.loading = false
        return
      }

      this.$store.dispatch('api/sports/save', this.formData)
        .then((data) => {
          this.formData = data
        }).catch(() => {
          this.$toast.error('Unknown Error')
        }).finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

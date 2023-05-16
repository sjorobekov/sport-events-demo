<template>
  <div>
    <h3 class="text-h4 my-3 neutral--text text--darken-4">
      Add Season
    </h3>

    <FxSeasonForm ref="form" v-model="formData" :disabled="loading" />

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
import { mapGetters } from 'vuex'

export default {
  name: 'FxSettingsSeasonAddPage',
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canManageSeasons'],
  },

  data: () => ({
    formData: { },
    loading: false,
  }),

  head: () => ({
    title: 'Add Season',
  }),

  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
    }),
  },

  methods: {
    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()

      if (!isValid) {
        this.loading = false
        return
      }

      this.$store.dispatch('api/seasons/save', {
        schoolId: this.schoolId,
        ...this.formData,
      }).then(() => {
        this.$store.dispatch('seasons/fetch')
        this.$toast.success('Season has been created successfully')
        this.$router.push({ name: 'settings-seasons' })
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

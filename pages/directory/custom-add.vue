<template>
  <div>
    <h3 class="text-h3 mb-6 neutral--text text--darken-4">
      Add Custom Opponent
    </h3>

    <FxOpponentForm ref="form" v-model="formData" :disabled="loading" />

    <v-container class="mt-4 mb-8">
      <v-row>
        <v-spacer />
        <v-btn outlined class="neutral--text text--darken-3" @click="$router.back()">
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
          Add Custom Opponent
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxOpponentForm from '@/components/FxOpponentForm'

export default {
  name: 'FxOpponentAddPage',
  components: {
    FxOpponentForm,
  },
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canCreateOpponent'],
  },

  data: () => ({
    formData: {
      coordinates: { lat: 0, lng: 0 },
    },
    loading: false,
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

      this.$store.dispatch('api/opponents/save', {
        schoolId: this.schoolId,
        ...this.formData,
      }).then(() => {
        this.$router.push({ name: 'directory-opponents' })
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

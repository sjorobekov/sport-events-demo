<template>
  <div>
    <h3 class="text-h3 mb-6">
      {{ title }}
    </h3>

    <FxLocationForm ref="form" v-model="formData" :disabled="loading" :country="school.country" />

    <v-container class="mt-4 mb-8">
      <v-row>
        <v-spacer />
        <v-btn outlined @click="$router.back()">
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
import FxLocationForm from '@/components/FxLocationForm'

export default {
  name: 'LocationEditPage',
  components: {
    FxLocationForm,
  },
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canManageSportLocation'],
  },
  data: () => ({
    formData: { },
    loading: false,
  }),
  async fetch () {
    if (this.isNew) {
      this.formData = {
        schoolId: this.schoolId,
      }
    } else {
      this.formData = await this.$store.dispatch('api/locations/get', {
        schoolId: this.schoolId,
        id: this.$route.params.locationId,
      })
    }
  },
  head () {
    return {
      title: this.title,
    }
  },
  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
      school: 'context/school',
    }),
    isNew () {
      return this.$route.params.locationId === 'add'
    },
    title () {
      return this.isNew ? 'Add Sports Location' : 'Edit Sports Location'
    },
  },
  methods: {
    async save () {
      this.loading = true
      const isValid = await this.$refs.form.validateAsync()

      if (!isValid) {
        this.loading = false
        return
      }

      this.$store.dispatch('api/locations/save', {
        ...this.formData,
      }).then(() => {
        this.$router.back()
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

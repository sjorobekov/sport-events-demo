<template>
  <div>
    <h3 class="text-h3 mb-6">
      {{ title }}
    </h3>

    <FxEventForm ref="form" v-model="formData" :disabled="loading" />

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
import FxEventForm from '@/components/FxEventForm/FxEventForm'

export default {
  name: 'AdminEventPage',
  components: {
    FxEventForm,
  },
  layout: 'admin',
  data: () => ({
    formData: { },
    loading: false,
  }),
  fetch () {
    if (this.isNew) {
      this.formData = {
        schoolId: this.$route.params.id,
      }
    } else {
      // this.formData = await this.$store.dispatch('api/locations/get', {
      //   schoolId: this.$route.params.id,
      //   id: this.$route.params.locationId,
      // })
    }
  },
  head () {
    return {
      title: this.title,
    }
  },
  computed: {
    isNew () {
      return this.$route.params.eventId === 'add'
    },
    title () {
      return this.isNew ? 'Create New Event' : 'Edit Event'
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
      }).then((res) => {
        this.$router.push({ name: 'management-schools-id-locations', params: { id: res.schoolId } })
      }).finally(() => {
        this.loading = false
      })
    },
  },

}
</script>

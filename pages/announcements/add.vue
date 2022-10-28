<template>
  <div>
    <h3 class="text-h3 mb-6">
      New Announcement
    </h3>

    <FxAnnouncementForm ref="form" v-model="formData" :disabled="loading" />

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
          <v-icon size="20">
            mdi-bullhorn
          </v-icon>Post Announcement
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxAnnouncementForm from '@/components/FxAnnouncementForm'

export default {
  name: 'FxAnnouncementAddPage',
  components: {
    FxAnnouncementForm,
  },

  data: () => ({
    formData: { },
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

      this.$store.dispatch('api/announcements/save', {
        schoolId: this.schoolId,
        ...this.formData,
      }).then((res) => {
        this.$emit('created', res)
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

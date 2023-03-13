<template>
  <div>
    <h3 class="text-h3 mb-6">
      New Announcement
    </h3>

    <client-only>
      <FxAnnouncementResponsiveFormContainer :modal="isMobile" @click:back="$router.back()">
        <FxAnnouncementForm
          ref="form"
          v-model="formData"
          :disabled="loading"
        />
        <v-btn
          v-if="isMobile"
          depressed
          color="primary"
          dark
          :loading="loading"
          block
          @click="save"
        >
          Post Announcement
        </v-btn>
      </FxAnnouncementResponsiveFormContainer>
    </client-only>

    <v-container class="mt-4 mb-8">
      <v-row>
        <v-spacer />
        <v-btn :ripple="false" outlined @click="$router.back()" class="neutral--text text--darken-3">
          Cancel
        </v-btn>
        <v-btn
          depressed
          color="primary"
          dark
          class="ml-2"
          :ripple="false"
          :loading="loading"
          @click="save"
        >
          <v-icon>
            $vuetify.icons.announcement-outline-small
          </v-icon>Post Announcement
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxAnnouncementForm from '@/components/PageComponents/FxAnnouncementPage/FxAnnouncementForm'
import FxAnnouncementResponsiveFormContainer
  from '@/components/PageComponents/FxAnnouncementPage/FxAnnouncementResponsiveFormContainer'

export default {
  name: 'FxAnnouncementAddPage',
  components: {
    FxAnnouncementResponsiveFormContainer,
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
    isMobile () {
      return this.$vuetify.breakpoint.smAndDown
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

      this.$store.dispatch('api/announcements/save', {
        schoolId: this.schoolId,
        ...this.formData,
      }).then((res) => {
        this.$router.push({ name: 'announcements-id', params: { id: res.id } })
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

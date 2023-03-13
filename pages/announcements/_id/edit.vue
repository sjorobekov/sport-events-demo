<template>
  <div>
    <client-only>
      <FxAnnouncementResponsiveFormContainer title="Edit Announcement" :modal="isMobile" @click:back="$router.back()">
        <FxAnnouncementForm
          ref="form"
          v-model="formData"
          :disabled="loading"
        />
        <template v-if="isMobile">
          <v-btn
            block
            depressed
            color="primary"
            dark
            :ripple="false"
            :loading="loading"
            class="mb-3 mobile-button"
            @click="save"
          >
            Update Announcement
          </v-btn>

          <v-btn
            depressed
            color="error"
            class="mobile-button"
            outlined
            :ripple="false"
            block
            @click="removeHandler()"
          >
            Delete Announcement
          </v-btn>
        </template>
      </FxAnnouncementResponsiveFormContainer>
    </client-only>
    <v-container class="mt-4 mb-8">
      <v-row>
        <v-spacer />
        <v-btn outlined :ripple="false" class="hidden-sm-and-down" @click="$router.back()">
          Cancel
        </v-btn>
        <v-btn
          depressed
          color="primary"
          dark
          :ripple="false"
          class="ml-2 hidden-sm-and-down"
          :loading="loading"
          @click="save"
        >
          Update Announcement
        </v-btn>

        <v-btn
          class="hidden-md-and-up"
          depressed
          color="error"
          :ripple="false"
          outlined
          block
          @click="$emit('click:remove', selectedItem.id)"
        >
          Delete Announcement
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
  name: 'FxAnnouncementEditPage',
  components: {
    FxAnnouncementResponsiveFormContainer,
    FxAnnouncementForm,
  },

  data: () => ({
    formData: {},
    loading: false,
    open: true,
  }),

  async fetch () {
    const data = await this.$store.dispatch('api/announcements/get', {
      id: this.$route.params.id,
      schoolId: this.schoolId,
    })

    this.formData = {
      ...data,
    }
  },
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

      this.$store
        .dispatch('api/announcements/save', {
          ...this.formData,
        })
        .then((res) => {
          this.$toast.success('Announcement has been updated!')
          this.$router.push({ name: 'announcements-id', params: { id: res.id } })
          this.$emit('updated', res)
        })
        .finally(() => {
          this.loading = false
        })
    },

    async removeHandler () {
      if (!confirm('Are you sure?')) {
        return
      }
      await this.$store.dispatch('api/announcements/remove', {
        schoolId: this.schoolId,
        id: this.formData.id,
      })
      this.$toast.info('Announcement has been removed')
      await this.$router.push({ name: 'announcements' })
      this.$emit('removed', this.formData.id)
    },
  },
}
</script>

<template>
  <wrapped-component :wrap="isMobile">
    <template #wrapper>
      <FxAnnouncementDialog
        :value="open"
        title="Edit Announcement"
        @back="$router.back()"
      />
    </template>
    <div>
      <h3 class="text-h3 mb-6 hidden-sm-and-down">
        Edit Announcement
      </h3>

      <FxAnnouncementForm
        ref="form"
        v-model="formData"
        :disabled="loading"
        :tile="isMobile"
      />

      <v-container class="mt-4 mb-8">
        <v-row>
          <v-spacer />
          <v-btn outlined class="hidden-sm-and-down" @click="$router.back()">
            Cancel
          </v-btn>
          <v-btn
            depressed
            color="primary"
            dark
            class="ml-2 hidden-sm-and-down"
            :loading="loading"
            @click="save"
          >
            <v-icon size="20" class="hidden-sm-and-down mx-2">
              mdi-content-save
            </v-icon>Update Announcement
          </v-btn>
        </v-row>
        <v-container class="mt-4">
          <v-btn
            depressed
            color="primary"
            dark
            class="hidden-md-and-up"
            block
            pb-2-4
            :loading="loading"
            @click="save"
          >
            Update Announcement
          </v-btn>
        </v-container>
        <v-container>
          <v-btn
            class="hidden-md-and-up"
            depressed
            color="error"
            outlined
            block
            @click="removeHandler()"
          >
            Delete Announcement
          </v-btn>
        </v-container>
      </v-container>
    </div>
  </wrapped-component>
</template>

<script>
import { mapGetters } from 'vuex'
import FxAnnouncementForm from '@/components/FxAnnouncementForm'

export default {
  name: 'FxAnnouncementEditPage',
  components: {
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
    async removeHandler () {
      if (!confirm('Are you sure?')) {
        return
      }
      await this.$store.dispatch('api/announcements/remove', {
        schoolId: this.schoolId,
        id: this.formData.id,
      })
      this.$toast.info('Announcement has been removed')
      this.$router.push({ name: 'announcements' })
    },
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
          this.$router.push({ name: 'announcements', query: { id: res.id } })
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

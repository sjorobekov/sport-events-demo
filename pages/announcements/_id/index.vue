<template>
  <client-only>
    <FxAnnouncementSelectedItemModal
      v-if="selectedItem"
      :item="selectedItem"
      :modal="isMobile"
      @click:back="$router.back()"
    >
      <template #actions>
        <v-menu
          v-if="canEditOrRemoveAnnouncement(selectedItem)"
          left
          bottom
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              class="float-right mt-2 hidden-sm-and-down"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="neutral darken-1">
                mdi-dots-horizontal
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              :to="{
                name: 'announcements-id-edit',
                params: { id: selectedItem.id },
              }"
            >
              <v-list-item-title class="neutral--text text--darken-3">
                Edit Announcement
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="removeHandler">
              <v-list-item-title class="neutral--text text--darken-3">
                Delete Announcement
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          v-if="canEditOrRemoveAnnouncement(selectedItem)"
          depressed
          color="neutral darken-3"
          outlined
          class="hidden-md-and-up mt-4"
          block
          :x-large="isMobile"
          :to="{
            name: 'announcements-id-edit',
            params: { id: selectedItem.id },
          }"
          link
        >
          Edit Announcement
        </v-btn>
      </template>
    </FxAnnouncementSelectedItemModal>
  </client-only>
</template>

<script>
import { mapGetters } from 'vuex'
import FxAnnouncementSelectedItemModal
  from '@/components/PageComponents/FxAnnouncementPage/FxAnnouncementSelectedItemModal'

export default {
  name: 'AnnouncementPage',
  components: { FxAnnouncementSelectedItemModal },

  data: () => ({
    selectedItem: {},
  }),

  async fetch () {
    this.selectedItem = await this.$store.dispatch('api/announcements/get', {
      schoolId: this.contextSchoolId,
      id: this.$route.params.id,
    })
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      canEditOrRemoveAnnouncement: 'user/acl/canEditOrRemoveAnnouncement',
    }),
    isMobile () {
      return this.$vuetify.breakpoint.smAndDown
    },
  },

  watch: {
    '$route.params.id' () {
      this.$fetch()
    },
  },

  methods: {
    async removeHandler () {
      if (!confirm('Are you sure?')) {
        return
      }
      await this.$store.dispatch('api/announcements/remove', {
        schoolId: this.contextSchoolId,
        id: this.selectedItem.id,
      })
      this.$toast.info('Announcement has been removed')
      await this.$router.push({ name: 'announcements' })
      this.$emit('removed', this.selectedItem.id)
    },
  },
}
</script>

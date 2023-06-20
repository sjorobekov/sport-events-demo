<template>
  <div class="mb-3">
    <v-row class="">
      <v-col cols="12" sm="6">
        <h1 class="text-h4 text-md-h3 neutral--text text--darken-4 font-weight-bold">
          Announcements
        </h1>
      </v-col>
      <v-col v-if="canCreateAnnouncement" cols="12" sm="6" class="d-flex justify-end align-center">
        <v-btn
          v-if="canCreateAnnouncement"
          link
          :block="isMobile"
          :x-large="isMobile"
          :ripple="false"
          :to="{ name: 'announcements-add' }"
          depressed
          color="primary"
        >
          <v-icon>$vuetify.icons.announcement-outline-small</v-icon>Create Announcement
        </v-btn>
      </v-col>
    </v-row>
    <div v-if="!showAnnouncements" class="mx-auto" style="max-width: 355px">
      <GuestLoginForm @signedIn="$fetch">
        <template #subtitle>
          Announcements are Password Protected.
        </template>
        <template #buttonLabel>
          View Announcements
        </template>
      </GuestLoginForm>
    </div>

    <v-row v-else-if="items.length">
      <v-col cols="12" md="4">
        <v-card class="bt">
          <FxAnnouncementListItem
            v-for="item in items"
            :key="item.id"
            :to="{ name: 'announcements-id', params: { id: item.id } }"
            :announcement="item"
          >
            <template #actions>
              <v-btn
                depressed
                :ripple="false"
                color="primary"
                class="mt-1 hidden-md-and-up"
                block
                x-large
              >
                Read More
              </v-btn>
            </template>
          </FxAnnouncementListItem>
        </v-card>
      </v-col>
      <v-col class="hidden-sm-and-down" md="8">
        <NuxtChild @updated="updateHandler" @removed="removeHandler" />
      </v-col>
    </v-row>
    <v-row v-else-if="!$fetchState.pending && !items.length">
      <v-col class="d-flex flex-column justify-center align-center pt-4 pt-md-12">
        <v-img width="100" :src="announcements" class="mb-4" />
        <div class="text-p3 text-center neutral--text text--darken-3 mb-4">
          No Announcements
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxAnnouncementListItem from '@/components/PageComponents/FxAnnouncementPage/FxAnnouncementListItem'
import GuestLoginForm from '@/components/PageComponents/FxEventIndividualPage/FxEventTeamSheet/GuestLoginForm'
import announcements from '@/components/PageComponents/FxAnnouncementPage/announcements.svg'

export default {
  name: 'AnnouncementsPage',
  components: {
    GuestLoginForm,
    FxAnnouncementListItem,
  },

  data: () => ({
    showAnnouncements: true,
    items: [],
    selectedItem: null,
    announcements,
  }),

  async fetch () {
    try {
      const { data } = await this.$store.dispatch('api/announcements/list', {
        schoolId: this.contextSchoolId,
      })
      this.showAnnouncements = true
      this.items = data
    } catch (e) {
      if (e.response?.status === 403) {
        this.showAnnouncements = false
      }
    }

    const { id } = this.$route.params
    if (!id) {
      if (this.items[0] && !this.isTabletMobile) {
        await this.$router.replace({ name: 'announcements-id', params: { id: this.items[0].id } })
      }
    }
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      canCreateAnnouncement: 'user/acl/canCreateAnnouncement',
    }),

    isTabletMobile () {
      return this.$vuetify.breakpoint.smAndDown
    },

    isMobile () {
      return this.$vuetify.breakpoint.xsOnly
    },
  },

  methods: {
    removeHandler (id) {
      const index = this.items.findIndex(item => item.id === id)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },

    updateHandler (val) {
      const announcement = this.items.find(item => item.id === val.id)
      Object.assign(announcement, val)
    },
  },
}
</script>

<style scoped>
.bt > :not(:last-child) {
  border-bottom: solid 1px var(--v-info-lighten4);
}
</style>

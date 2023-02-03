<template>
  <div class="mt-1 mt-md-n4  mb-3">
    <v-list-item class="px-0 mb-4">
      <v-list-item-content>
        <h1 class="text-h4s text-md-h3">
          Announcements
        </h1>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          v-if="canCreateAnnouncement"
          class="hidden-xs-only"
          link
          :to="{ name: 'announcements-add' }"
          depressed
          color="primary"
          height="40"
        >
          <v-icon>$vuetify.icons.bullhorn</v-icon>Create Announcement
        </v-btn>
        <v-btn
          v-if="canCreateAnnouncement"
          class="hidden-sm-and-up"
          small
          link
          :to="{ name: 'announcements-add' }"
          depressed
          color="primary"
        >
          New Announcement
        </v-btn>
      </v-list-item-action>
    </v-list-item>

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

    <v-row v-else>
      <v-col cols="12" md="5">
        <v-card class="bt">
          <template v-if="items.length">
            <FxAnnouncementListItem
              v-for="item in items"
              :key="item.id"
              :to="{ name: 'announcements-id', params: { id: item.id } }"
              :announcement="item"
            >
              <template #actions>
                <v-btn depressed color="primary" class="mt-1 hidden-md-and-up" block>
                  Read More
                </v-btn>
              </template>
            </FxAnnouncementListItem>
          </template>
          <template v-else>
            <v-sheet height="120">
              <v-row class="fill-height" justify="center" align="center">
                <v-col>
                  <h1 class="text-center text-h4 info--text text--lighten-4">
                    No Announcements
                  </h1>
                </v-col>
              </v-row>
            </v-sheet>
          </template>
        </v-card>
      </v-col>
      <v-col class="hidden-sm-and-down" md="7">
        <NuxtChild @updated="updateHandler" @removed="removeHandler" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxAnnouncementListItem from '@/components/PageComponents/FxAnnouncementPage/FxAnnouncementListItem'
import GuestLoginForm from '@/components/PageComponents/FxEventIndividualPage/FxEventTeamSheet/GuestLoginForm'

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
      if (this.items[0] && !this.isMobile) {
        await this.$router.replace({ name: 'announcements-id', params: { id: this.items[0].id } })
      }
    }
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      canCreateAnnouncement: 'user/acl/canCreateAnnouncement',
    }),

    isMobile () {
      return this.$vuetify.breakpoint.smAndDown
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

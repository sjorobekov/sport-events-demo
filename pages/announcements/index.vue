<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-xs-h4s text-sm-h3">
          Announcements
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          v-if="canCreateAnnouncement"
          class="hidden-xs-only"
          link
          :to="{ name: 'announcements-add' }"
          depressed
          color="primary"
        >
          <v-icon>mdi-bullhorn</v-icon>Create Announcement
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
        <div class="rounded background-white overflow-hidden bt">
          <template v-if="items.length">
            <FxAnnouncementListItem
              v-for="item in items"
              :key="item.id"
              :to="{ name: 'announcements', query: { id: item.id } }"
              :announcement="item"
            >
              <template #actions>
                <v-btn depressed color="primary" class="hidden-md-and-up" block>
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
        </div>
      </v-col>
      <v-col class="hidden-sm-and-down" md="7">
        <wrapped-component v-if="selectedItem" :wrap="isMobile">
          <template #wrapper>
            <FxAnnouncementDialog
              :value="!!selectedItem"
              @back="$router.back()"
            />
          </template>
          <FxAnnouncementSelectedItem v-if="selectedItem" :item="selectedItem">
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
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    :to="{
                      name: 'announcements-id-edit',
                      params: { id: selectedItem.id },
                    }"
                  >
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="removeHandler(selectedItem.id)">
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
               <v-btn
                    depressed
                    color="primary"
                    outlined
                    class="hidden-md-and-up mt-4"
                    block
                    :to="{
                      name: 'announcements-id-edit',
                      params: { id: selectedItem.id },
                    }"
                    link
                  >
                    Edit
                  </v-btn>
            </template>
          </FxAnnouncementSelectedItem>
        </wrapped-component>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxAnnouncementListItem from '@/components/PageComponents/FxAnnouncementPage/FxAnnouncementListItem'
import FxAnnouncementSelectedItem from '@/components/PageComponents/FxAnnouncementPage/FxAnnouncementSelectedItem'
import GuestLoginForm from '@/components/PageComponents/FxEventIndividualPage/FxEventTeamSheet/GuestLoginForm'
import FxAnnouncementDialog from '~/components/FxAnnouncementDialog.vue'

export default {
  name: 'AnnouncementsPage',
  components: {
    GuestLoginForm,
    FxAnnouncementSelectedItem,
    FxAnnouncementListItem,
    FxAnnouncementDialog,
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
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
      canCreateAnnouncement: 'user/acl/canCreateAnnouncement',
      canEditOrRemoveAnnouncement: 'user/acl/canEditOrRemoveAnnouncement',
    }),
    isMobile () {
      return this.$vuetify.breakpoint.smAndDown
    },

    drawerPermanent () {
      return !this.isMobile
    },
  },

  watch: {
    '$route.query' ({ id }) {
      this.selectedItem = this.items.find(item => item.id === id)
    },
  },

  async mounted () {
    if (this.isMobile) {
      return
    }

    const { id } = this.$route.query
    if (!id) {
      if (this.items[0]) {
        await this.$router.replace({ query: { id: this.items[0].id } })
      }
    }

    try {
      this.selectedItem = await this.$store.dispatch('api/announcements/get', {
        schoolId: this.contextSchoolId,
        id,
      })
    } catch (e) {}
  },

  methods: {
    async removeHandler (id) {
      await this.$store.dispatch('api/announcements/remove', {
        schoolId: this.contextSchoolId,
        id,
      })
      const index = this.items.findIndex(item => item.id === id)
      if (index > -1) {
        this.items.splice(index, 1)
      }
      this.selectedItem = null
      this.$toast.info('Announcement has been removed')
    },
  },
}
</script>

<style scoped>
.background-white {
  background: white;
}
.bt > :not(:last-child) {
  border-bottom: solid 1px var(--v-info-lighten4);
}
</style>

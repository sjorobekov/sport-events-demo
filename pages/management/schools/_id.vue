<template>
  <div>
    <v-row>
      <v-col>
        <h3>{{ school.name }}</h3>
        <div class="subtitle-1">
          {{ location }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col style="max-width: 270px">
        <v-card
          class="mx-auto"
          flat
          outlined
        >
          <v-list dense>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              link
              :to="item.to"
              :exact="item.exact"
            >
              <v-list-item-icon>
                <v-icon color="info lighten-1" v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text--info text--darken-1" v-text="item.text" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col>
        <NuxtChild />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'admin',

  async asyncData ({ store, route }) {
    await store.dispatch('admin/page/school/fetch', route.params.id)
  },

  data: () => ({}),

  head () {
    return {
      title: this.school.name,
    }
  },

  computed: {
    ...mapGetters({
      school: 'admin/page/school/school',
      country: 'countries/name',
    }),
    location () {
      return [this.school.city, this.country(this.school.country)].join(', ')
    },
    items () {
      return [
        { text: 'School Information', icon: '$vuetify.icons.info', exact: true, to: { name: 'management-schools-id', params: { id: this.$route.params.id } } },
        { text: 'Users', icon: '$vuetify.icons.team', to: { name: 'management-schools-id-users', params: { id: this.$route.params.id } } },
        { text: 'Teams', icon: '$vuetify.icons.tshirt', to: { name: 'management-schools-id-teams', params: { id: this.$route.params.id } } },
        { text: 'Events', icon: '$vuetify.icons.calendar', to: { name: 'management-schools-id-events', params: { id: this.$route.params.id } } },
        { text: 'Privacy', icon: '$vuetify.icons.shield', to: { name: 'management-schools-id-privacy', params: { id: this.$route.params.id } } },
        { text: 'In-House Sport', icon: '$vuetify.icons.trophy', to: { name: 'management-schools-id-sports', params: { id: this.$route.params.id } } },
        { text: 'Students', icon: '$vuetify.icons.student', to: { name: 'management-schools-id-students', params: { id: this.$route.params.id } } },
        { text: 'Sports Records', icon: '$vuetify.icons.stopwatch', to: { name: 'management-schools-id-records', params: { id: this.$route.params.id } } },
        { text: 'Customisation', icon: '$vuetify.icons.settings', to: { name: 'management-schools-id-customisation', params: { id: this.$route.params.id } } },
        { text: 'Announcements', icon: '$vuetify.icons.announcement', to: { name: 'management-schools-id-announcements', params: { id: this.$route.params.id } } },
        { text: 'Subscription', icon: '$vuetify.icons.repeat', to: { name: 'management-schools-id-subscription', params: { id: this.$route.params.id } } },
      ]
    },
  },
}
</script>

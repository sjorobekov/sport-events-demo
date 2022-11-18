<template>
  <div>
    <v-row>
      <v-col cols="6">
        <h1>Sports Contacts</h1>
      </v-col>
      <v-col v-if="canCreateSportsContacts" cols="6" class="d-flex justify-end align-center">
        <v-btn dark color="primary" :to="{ name: 'directory-sports-contacts-add' }">
          <v-icon>$vuetify.icons.plusOutline</v-icon>Add Sports Contact
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="contact in contacts"
        :key="contact.id"
        cols="12"
        xs="6"
        sm="6"
        md="3"
        lg="3"
      >
        <FxSportsContactCard :contact="contact" style="height: 100%" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxSportsContactCard from '~/components/PageComponents/FxSportsContactsPage/FxSportsContactCard.vue'
export default {
  name: 'SportsContactsPage',
  components: { FxSportsContactCard },
  data: () => ({
    contacts: [],
  }),
  async fetch () {
    this.contacts = await this.$store.dispatch('api/sportsContacts/list', {
      schoolId: this.schoolId,
    })
  },
  computed: {
    ...mapGetters({
      schoolId: 'context/schoolId',
      canCreateSportsContacts: 'user/acl/canCreateSportsContacts',
    }),
  },
}
</script>

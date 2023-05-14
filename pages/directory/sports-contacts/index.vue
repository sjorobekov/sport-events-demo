<template>
  <div>
    <v-row class="">
      <v-col cols="12" sm="6">
        <h1 class="text-h4s text-md-h3">
          Sports Contacts
        </h1>
      </v-col>
      <v-col v-if="canCreateSportsContacts" cols="12" sm="6" class="d-flex justify-end align-center">
        <v-btn depressed class="mobile-button-100" dark color="primary" :to="{ name: 'directory-sports-contacts-add' }">
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
        md="4"
        lg="4"
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
<style scoped lang="sass">
@import '~vuetify/src/styles/styles'

@media #{map-get($display-breakpoints, 'xs-only')}
  .mobile-button
    width: 100%!important
</style>

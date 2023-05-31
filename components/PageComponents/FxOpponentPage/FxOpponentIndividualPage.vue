<template>
  <client-only>
    <FxOpponentSelectedItemModal
      v-if="opponent"
      :item="opponent"
      :modal="isMobile"
      @click:back="$router.push({name: 'directory-opponents'})"
    />
  </client-only>
</template>

<script>
import { mapGetters } from 'vuex'
import FxOpponentSelectedItemModal from './components/FxOpponentSelectedItemModal.vue'

export default {
  name: 'OpponentIndividualPage',
  components: {
    FxOpponentSelectedItemModal,
  },

  data: () => ({
    opponent: {},
  }),

  async fetch () {
    await this.$store.dispatch('page/opponent/fetchData', this.opponentId)
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
    opponentId () {
      return this.$route.params.opponentId
    },
    school () {
      return this.opponent.opponentSchool || null
    },
    coordinates () {
      return this.school?.coordinates || null
    },
    isMobile () {
      return this.$vuetify.breakpoint.smAndDown
    },
  },

  watch: {
    '$route.params.opponentId' () {
      this.$fetch()
    },
  },
}
</script>

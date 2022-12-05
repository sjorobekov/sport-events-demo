<template>
  <div v-if="opponentId">
    <v-row>
      <v-col>
        <FxOpponentCard :opponent="opponent" :school="school" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <FxContactsCard />
      </v-col>
      <v-col>
        <FxMapCard :coordinates="coordinates" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FxOpponentCard from '@/components/PageComponents/FxOpponentPage/FxOpponentCard'
import FxContactsCard from '@/components/PageComponents/FxOpponentPage/FxContactsCard'
import FxMapCard from '@/components/PageComponents/FxOpponentPage/FxMapCard'

export default {
  name: 'OpponentIndividualPage',
  components: {
    FxOpponentCard,
    FxContactsCard,
    FxMapCard,
  },

  data: () => ({
    opponent: {},
  }),

  async fetch () {
    if (this.opponentId) {
      this.opponent = await this.$store.dispatch('api/opponents/fetch', { schoolId: this.contextSchoolId, id: this.opponentId })
    }
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
  },

  watch: {
    opponentId () {
      this.$fetch()
    },
  },
}
</script>

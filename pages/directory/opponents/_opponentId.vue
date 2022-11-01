<template>
  <FxOpponentCard :opponent-id="opponentId" />
</template>

<script>
import FxOpponentCard from '@/components/PageComponents/FxOpponentPage/FxOpponentCard'

export default {
  name: 'OpponentIndividualPage',
  components: {
    FxOpponentCard,
  },

  computed: {
    opponentId () {
      return this.$route.params.opponentId
    },
  },
}
</script>

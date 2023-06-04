<template>
  <div class="pt-0">
    <FxEventIndividualPage />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventResult, EventType } from '@/enum'
import FxEventIndividualPage from '@/components/PageComponents/FxEventIndividualPage/FxEventIndividualPage'

export default {
  name: 'EventIndividualPage',
  components: {
    FxEventIndividualPage,
  },

  async asyncData ({ store, route }) {
    await store.dispatch('page/event/fetchData', route.params.eventId)
  },

  data: () => ({
    EventType,
    EventResult,
  }),

  computed: {
    ...mapGetters({
      isMobileDevice: 'context/isMobile',
      isTabletDevice: 'context/isTablet',
    }),

    isMobile () {
      if (process.client) {
        return this.$vuetify.breakpoint.smAndDown
      }

      return this.isMobileDevice || this.isTabletDevice
    },
  },
}
</script>

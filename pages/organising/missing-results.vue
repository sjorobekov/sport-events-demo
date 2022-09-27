<template>
  <div>
    <h1>Missing Results</h1>
    <FxSportExpansionPanel v-for="sport in sports" :key="sport.id" class="mb-4" :item="sport">
      <FxMissingResultEventItem v-for="event in eventsBySport[sport.id]" :key="event.id" :value="event" />
    </FxSportExpansionPanel>
  </div>
</template>

<script>
import groupBy from 'lodash/groupBy'
import uniqBy from 'lodash/uniqBy'
import { mapGetters } from 'vuex'
import FxMissingResultEventItem
  from '@/components/PageComponents/FxMissingResultsPage/FxMissingResultEventItem/FxMissingResultEventItem'

export default {
  name: 'MissingResults',
  components: { FxMissingResultEventItem },
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canSeeOrganising'],
  },

  data: () => ({
    sports: [],
    eventsBySport: {},
  }),

  async fetch () {
    const { data: events } = await this.$store.dispatch('api/events/getBySchool', {
      schoolId: this.contextSchoolId,
      params: {
        missingResults: true,
      },
    })

    this.sports = uniqBy(events.map(event => event.sport), 'id')
    this.eventsBySport = groupBy(events, 'sportId')
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
  },
}
</script>

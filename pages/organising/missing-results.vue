<template>
  <div>
    <h1 class="text-h3 mt-16">
      Missing Results
    </h1>
    <p class="text-p3 info--text text--darken-1 mb-6">
      {{ $tc('page.MissingResults.MISSING_RESULTS', count) }}
    </p>
    <FxSportExpansionPanel v-for="sport in sports" :key="sport.id" class="mb-4" :item="sport">
      <FxMissingResultEventItem v-for="event in eventsBySport[sport.id]" :key="event.id" :value="event" />

      <template #actions>
        <div class="text-p2 info--text text-right">
          {{ $tc('page.MissingResults.MISSING_RESULTS', eventsBySport[sport.id].length) }}
        </div>
      </template>
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
    count: 0,
    eventsBySport: {},
  }),

  async fetch () {
    const { data: events } = await this.$store.dispatch('api/events/getBySchool', {
      schoolId: this.contextSchoolId,
      params: {
        missingResults: true,
      },
    })

    this.count = events.length

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

<template>
  <div class="">
    <h1 class="text-h4s text-md-h3 neutral--text text--darken-4 mb-2">
      Missing Results
    </h1>
    <p class="text-p3 neutral--text text--darken-3 mb-6">
      {{ $tc('page.MissingResults.MISSING_RESULTS', count) }}
    </p>
    <FxSportExpansionPanel v-for="sport in sports" :key="sport.id" class="mb-4" :item="sport">
      <FxMissingResultEventItem v-for="event in eventsBySport[sport.id]" :key="event.id" :value="event" />

      <template #actions>
        <div class="text-p2 neutral--text text--darken-2 text-right">
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
      .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))
    this.eventsBySport = groupBy(events, 'sportId')
  },

  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
  },
}
</script>

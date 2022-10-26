<template>
  <client-only>
    <v-data-table
      :headers="headers"
      :items="teamSheet"
      disable-pagination
      hide-default-footer
    >
      <template #item.name="{ item, index }">
        <span>{{ index + 1 }}. {{ item.firstname }} {{ item.lastname }}</span>
      </template>
      <template #item.year="{ item }">
        <span>Year {{ item.yearGroup }}</span>
      </template>
    </v-data-table>
  </client-only>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FxTeamsEventTeamSheet',
  components: {
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    teamSheet: [],
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Year', value: 'year' },
    ],
  }),
  async fetch () {
    this.teamSheet = await this.$store.dispatch('api/events/getTeamSheet', {
      schoolId: this.contextSchoolId,
      id: this.value.id,
    })
  },
  computed: {
    ...mapGetters({
      contextSchoolId: 'context/schoolId',
    }),
  },
}
</script>

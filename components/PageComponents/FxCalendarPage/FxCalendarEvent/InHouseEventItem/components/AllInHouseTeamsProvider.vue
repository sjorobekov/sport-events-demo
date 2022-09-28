<template>
  <div>
    <slot
      name="default"
      v-bind="{ teams, isFetching, fetched }"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AllInHouseTeamsProvider',
  async fetch () {
    await this.fetchData()
  },

  computed: {
    ...mapGetters({
      isFetching: 'components/AllInHouseTeamsProvider/isFetching',
      teams: 'components/AllInHouseTeamsProvider/teams',
      fetched: 'components/AllInHouseTeamsProvider/fetched',
    }),
  },

  methods: {
    ...mapActions({
      fetchData: 'components/AllInHouseTeamsProvider/fetchData',
    }),
  },
}
</script>

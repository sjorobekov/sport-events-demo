<template>
  <h1>Today's Teams</h1>
</template>

<script>
export default {
  name: 'TodaysTeams',
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canSeeOrganising'],
  },
}
</script>

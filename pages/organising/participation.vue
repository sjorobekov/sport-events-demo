<template>
  <h1>Participation</h1>
</template>

<script>
export default {
  name: 'ParticipationPage',
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canSeeOrganising'],
  },
}
</script>

<template>
  <h1>Missing Results</h1>
</template>

<script>
export default {
  name: 'MissingResults',
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canSeeOrganising'],
  },
}
</script>

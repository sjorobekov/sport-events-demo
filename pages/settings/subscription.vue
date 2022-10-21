<template>
  <h1>Subscriptions</h1>
</template>

<script>
export default {
  name: 'SubscriptionsPage',
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canManageSubscription'],
  },
}
</script>

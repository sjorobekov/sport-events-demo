<template>
  <v-list-item class="px-0">
    <v-list-item-content>
      <v-list-item-title class="text-h4">
        Subscription
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'SubscriptionsPage',
  meta: {
    isAllowed: ({ getters }) => getters['user/acl/canManageSubscription'],
  },
}
</script>

<template>
  <div>
    <h1>Checkout</h1>
  </div>
</template>

<script>
export default {
  name: 'CheckoutPage',
  layout: 'empty',
  middleware: ({ redirect, store, error, route, $config }) => {
    if (!store.getters['context/isCheckoutSite']) {
      error({ statusCode: 404, message: 'Page not found' })
    }
    if (process.server && route.query.schoolId && route.query.path) {
      const url = $config.PORTAL_WILDCARD.replace('*', route.query.schoolId) + route.query.path
      redirect(url)
    }
  },
}
</script>

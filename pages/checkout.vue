<template>
  <div>
    <h1>Checkout</h1>
  </div>
</template>

<script>
export default {
  name: 'CheckoutPage',
  layout: 'empty',
  middleware: ({ redirect, store, error, route }) => {
    if (!store.getters['context/isCheckoutSite']) {
      error({ statusCode: 404, message: 'Page not found' })
    }
    if (process.server && route.query.url) {
      redirect(route.query.url)
    }
  },
}
</script>

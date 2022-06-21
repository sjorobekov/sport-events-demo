export default function ({ store, route, error, redirect }) {
  if (!(route.meta && route.meta[0])) {
    return
  }

  const { isAllowed } = route.meta[0]
  if (isAllowed) {
    if (!store.getters['context/me']) {
      return redirect({ name: 'signin' })
    }

    if (!isAllowed(store)) {
      error({ statusCode: 403, message: 'You don\'t have access to this page' })
    }
  }
}

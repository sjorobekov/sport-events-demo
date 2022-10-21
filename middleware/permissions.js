export default function ({ store, route, error, redirect }) {
  if (!(route.meta)) {
    return
  }

  const isAllowedCheckers = route.meta.filter(({ isAllowed }) => {
    return typeof isAllowed === 'function'
  })

  if (isAllowedCheckers.length > 0) {
    if (!store.getters['context/me']) {
      return redirect({ name: 'signin' })
    }
  } else {
    return
  }

  const result = isAllowedCheckers.every(({ isAllowed }) => isAllowed(store))

  if (!result) {
    return error({ statusCode: 403, message: 'You don\'t have access to this page' })
  }
}

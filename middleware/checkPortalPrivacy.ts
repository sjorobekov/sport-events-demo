import { Middleware } from '@nuxt/types'

const checkPortalPrivacyMiddleware: Middleware = ({ store, route, redirect }) => {
  if (store.getters['context/isPortalSite']) {
    const school = store.getters['context/school']

    if (school.portalProtected && !store.getters['context/isLoggedIn']) {
      if (route.name !== 'signin') {
        return redirect({
          name: 'signin',
          query: { redirectTo: route.fullPath },
        })
      }
    }
  }
}

export default checkPortalPrivacyMiddleware

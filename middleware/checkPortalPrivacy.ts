import { Middleware } from '@nuxt/types'

const checkPortalPrivacyMiddleware: Middleware = ({ store, route, redirect }) => {
  if (store.getters['context/isPortalSite']) {
    const school = store.getters['context/school']

    if (school.portalProtected && !store.getters['context/isLoggedIn'] && !store.getters['context/isGuestSignedIn']) {
      if (route.name !== 'signin' && route.name !== 'schoolPass') {
        return redirect({
          name: 'signin',
          query: { redirectTo: route.fullPath },
        })
      }
    }
  }
}

export default checkPortalPrivacyMiddleware

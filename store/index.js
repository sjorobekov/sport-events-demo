export const actions = {
  async nuxtServerInit ({ dispatch, commit, getters }, { req }) {
    const hostname = req.headers.host
    const subdomain = hostname.split('.')[0]
    commit('context/subdomain', subdomain)
    if (getters['context/isPortalSite']) {
      await dispatch('context/fetchSchoolByPortalAddress', subdomain)
    }

    await dispatch('context/fetchContext').catch((e) => {
      if (e.response?.status !== 401) {
        // eslint-disable-next-line no-console
        console.log('error', e)
      }
    })

    await dispatch('seasons/fetch').catch((e) => {
      // eslint-disable-next-line no-console
      console.log('error', e)
    })
  },

  nuxtClientInit ({ getters, dispatch }) {
    if (getters['context/isPortalSite']) {
      dispatch('context/applyPrimaryColor')
    }
  },
}

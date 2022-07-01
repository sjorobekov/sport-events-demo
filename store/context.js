export const state = () => ({
  me: null,
  subdomain: null,
  school: null,
  sportLocations: [],
  sportLocationsIndexed: {},
})

export const getters = {
  isLoggedIn (state) {
    return !!state.me
  },

  me (state) {
    return state.me
  },

  myId (state) {
    return state.me?.id
  },

  role (state) {
    if (state.me) {
      return state.me.userRole
    }
    return 'GUEST'
  },

  subdomain (state) {
    return state.subdomain
  },

  isSuperAdminSite (state) {
    return state.subdomain === 'admin'
  },

  isPortalSite (state) {
    return state.subdomain !== 'admin'
  },

  school (state) {
    return state.school
  },

  schoolId (state) {
    return state.school?.id
  },

  sportLocations (state) {
    return state.sportLocations
  },
}

export const mutations = {
  me (state, val) {
    state.me = val
  },

  subdomain (state, val) {
    state.subdomain = val
  },

  school (state, val) {
    state.school = val
  },

  sportLocations (state, locations) {
    state.sportLocations = locations
    locations.forEach((item) => {
      state.sportLocationsIndexed[item.id] = item
    })
  },
}

// actions
export const actions = {
  async fetchSchoolByPortalAddress ({ commit, getters }) {
    const school = await this.$axios.$get(`/api/v1/portalAddress/${getters.subdomain}`)
    commit('school', {
      id: school.id,
      name: school.name,
      logo: school.logo,
      color: school.color ?? 'var(--v-brand-base)',
    })
  },

  async fetchSportLocations ({ commit, getters, dispatch }) {
    const items = await dispatch('api/locations/list', {
      schoolId: getters.schoolId,
    }, { root: true })

    commit('sportLocations', items)
  },

  async signInAsSuperAdmin ({ dispatch }, { email, password }) {
    await this.$axios.$post('/api/v1/login', {
      email,
      password,
    })

    await dispatch('fetchContext')
  },

  async signIn ({ dispatch }, { email, password, schoolId }) {
    await this.$axios.$post(`/api/v1/schools/${schoolId}/login`, {
      email,
      password,
    })

    await dispatch('fetchContext')
  },

  async logOut ({ dispatch }) {
    await this.$axios.$get('/api/v1/logout')
    dispatch('cleanup')
  },

  async fetchContext ({ commit }) {
    const { user } = await this.$axios.$get('/api/v1/context')
    commit('me', user)
  },

  cleanup ({ commit }) {
    commit('me', null)
  },
}

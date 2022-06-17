export const state = () => ({
  me: null,
  portalAddress: null,
  school: null,
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

  portalAddress (state) {
    return state.portalAddress
  },

  school (state) {
    return state.school
  },
}

export const mutations = {
  me (state, val) {
    state.me = val
  },

  portalAddress (state, val) {
    state.portalAddress = val
  },

  school (state, val) {
    state.school = val
  },
}

// actions
export const actions = {
  async fetchSchoolByPortalAddress ({ commit }, portalAddress) {
    const school = await this.$axios.$get(`/api/v1/portalAddress/${portalAddress}`)
    commit('portalAddress', school.portalAddress)
    commit('school', {
      id: school.id,
      name: school.name,
      logo: school.logo,
      color: school.color ?? 'var(--v-brand-base)',
    })
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

export const state = () => ({
  me: null,
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
}

// actions
export const actions = {
  async signIn ({ dispatch }, { email, password }) {
    await this.$axios.$post('/api/v1/login', {
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
    commit('setMe', user)
  },

  cleanup ({ commit }) {
    commit('setMe', null)
  },
}

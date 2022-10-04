import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Dictionary, Location, School, User } from '~/types'

interface ContextInterface {
  me: User | null,
  subdomain: string | null,
  school: School | null,
  sportLocations: Array<Location>,
  sportLocationsIndexed: Dictionary<Location>,
  isGuestSignedIn: boolean | null,
}

export const state = (): ContextInterface => ({
  me: null,
  subdomain: null,
  school: null,
  sportLocations: [],
  sportLocationsIndexed: {},
  isGuestSignedIn: null,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
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

  isPortalSite (_, getters) {
    return !getters.isSuperAdminSite && !getters.isSignUpSite
  },

  isSignUpSite (state) {
    return state.subdomain === 'signup'
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

  isSheetPasswordProtected (state) {
    return state.school?.teamSheetsProtected
  },

  isGuestSignedIn (state) {
    return state.isGuestSignedIn
  },
}

export const mutations: MutationTree<RootState> = {
  me (state, val: User) {
    state.me = val
  },

  isGuestSignedIn (state, val: boolean) {
    state.isGuestSignedIn = val
  },

  subdomain (state, val: string) {
    state.subdomain = val
  },

  school (state, val: School) {
    state.school = val
  },

  sportLocations (state, locations: Array<Location>) {
    state.sportLocations = locations
    locations.forEach((item) => {
      state.sportLocationsIndexed[item.id] = item
    })
  },
}

// actions
export const actions: ActionTree<RootState, RootState> = {
  async fetchSchoolByPortalAddress ({ commit, getters }) {
    const school = await this.$axios.$get(`/api/v1/portalAddress/${getters.subdomain}`)
    commit('school', {
      id: school.id,
      name: school.name,
      logo: school.logo,
      color: school.color ?? 'var(--v-brand-base)',
      portalProtected: school.portalProtected,
      teamSheetsProtected: school.teamSheetsProtected,
      announcementsProtected: school.announcementsProtected,
      email: school.email,
    })
    commit('api/schools/cache', school, { root: true })
  },

  async fetchSchool ({ commit, dispatch }, id) {
    const school = await dispatch('api/schools/fetch', id, { root: true })
    commit('school', school)
    await dispatch('fetchSportLocations')
  },

  applyPrimaryColor ({ getters }) {
    const root = document.documentElement
    root.style.setProperty('--v-primary-base', getters.school.color)
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

  forgotPassword (_, { email, schoolId }) {
    return this.$axios.$post(`/api/v1/schools/${schoolId}/forgotPassword`, {
      email,
    })
  },

  async guestSignIn ({ commit }, { password, schoolId }) {
    await this.$axios.$post(`/api/v1/schools/${schoolId}/guestSignIn`, {
      password,
    })

    commit('isGuestSignedIn', true)
  },

  async logOut ({ dispatch }) {
    await this.$axios.$post('/api/v1/logout')
    dispatch('cleanup')
  },

  async fetchContext ({ commit }) {
    const { user, isGuestSignedIn } = await this.$axios.$get('/api/v1/context')
    commit('me', user)
    commit('isGuestSignedIn', isGuestSignedIn)
  },

  cleanup ({ commit }) {
    commit('me', null)
  },
}

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

  school (state, school: School) {
    state.school = {
      id: school.id,
      name: school.name,
      logo: school.logo,
      color: school.color ?? '#193F66',
      portalProtected: school.portalProtected,
      teamSheetsProtected: school.teamSheetsProtected,
      announcementsProtected: school.announcementsProtected,
      email: school.email,
      city: school.city,
      country: school.country,
      state: school.state,
      street: school.street,
      zip: school.zip,
      website: school.website,
    }
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
    commit('school', school)
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
    root.style.setProperty('--v-accent-base', getters.school.color)
    root.style.setProperty('--v-primary-darken1', shadeColor(getters.school.color, -30))
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

function shadeColor (color: string, percent: number) {
  let R = parseInt(color.substring(1, 3), 16)
  let G = parseInt(color.substring(3, 5), 16)
  let B = parseInt(color.substring(5, 7), 16)

  R = Math.floor(R * (100 + percent) / 100)
  G = Math.floor(G * (100 + percent) / 100)
  B = Math.floor(B * (100 + percent) / 100)

  R = (R < 255) ? R : 255
  G = (G < 255) ? G : 255
  B = (B < 255) ? B : 255

  const RR = ((R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16))
  const GG = ((G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16))
  const BB = ((B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16))

  return '#' + RR + GG + BB
}

import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Dictionary, PaginatedList, School, User } from '~/types'

export const state = () => ({
  indexed: {} as Dictionary<School>,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  multipartHeaders: () => ({ 'Content-Type': 'multipart/form-data' }),
}

export const mutations: MutationTree<RootState> = {
  cache (state, item: School): void {
    state.indexed[item.id] = item
  },
}

type QueryParams = {
  page: number,
  sortBy: string,
  sortDesc: boolean,
  search?: string,
}

export const actions: ActionTree<RootState, RootState> = {
  list (_, params: QueryParams): Promise<PaginatedList<School>> {
    return this.$axios.$get('/api/v1/schools', {
      params,
    })
  },

  async save ({ commit }, payload: School): Promise<School> {
    const data = {
      name: payload.name,
      street: payload.street,
      country: payload.country,
      city: payload.city,
      state: payload.state,
      zip: payload.zip,
      portal: payload.portal,
      website: payload.website,
      portalAddress: payload.portal ? payload.portalAddress : null,
      emailDomains: payload.emailDomains,
      coordinates: payload.coordinates,
    }
    if (payload.id) {
      const res = await this.$axios.$put(`/api/v1/schools/${payload.id}`, data)
      commit('cache', res)
      return res
    }

    return this.$axios.$post('/api/v1/schools', data)
  },

  savePrivacy (_, { id, ...payload }): Promise<School> {
    return this.$axios.$patch(`/api/v1/schools/${id}/privacy`, {
      portalProtected: payload.portalProtected,
      teamSheetsProtected: payload.teamSheetsProtected,
      announcementsProtected: payload.announcementsProtected,
      email: payload.email,
      password: payload.password,
    })
  },

  saveXportal (_, { id, ...payload }): Promise<School> {
    return this.$axios.$patch(`/api/v1/schools/${id}/xportal`, {
      xportalRelyingPartyId: payload.xportalRelyingPartyId,
      xportalSchoolId: payload.xportalSchoolId,
      xportalSecret: payload.xportalSecret,
    })
  },

  getXportal (_, id): Promise<School> {
    return this.$axios.$get(`api/v1/schools/${id}/xportal`)
  },

  get (_, id): Promise<School> {
    return this.$axios.$get(`api/v1/schools/${id}`)
  },

  getPaymentDetails (_, id) {
    return this.$axios.$get(`api/v1/schools/${id}/payment_details`)
  },

  getTransactions (_, id) {
    return this.$axios.$get(`api/v1/schools/${id}/transactions`)
  },

  async fetch ({ state, commit, dispatch }, id): Promise<School> {
    if (!state.indexed[id]) {
      const data = await dispatch('get', id)
      commit('cache', data)
    }

    return state.indexed[id]
  },

  async getPassword (_, id): Promise<String> {
    const res = await this.$axios.$get(`api/v1/schools/${id}/password`)
    return String(res)
  },

  saveColor (_, { id, color }): Promise<School> {
    return this.$axios.$patch(`/api/v1/schools/${id}/color`, {
      color,
    })
  },

  saveLogo ({ rootGetters, getters }, { id, file }): Promise<School> {
    const formData = new FormData()
    const extension = rootGetters['helper/extension'](file.type)
    formData.append('file', file, `file.${extension}`)
    return this.$axios.$post(`/api/v1/schools/${id}/logo`, formData, { headers: getters.multipartHeaders })
  },

  removeLogo (_, id): Promise<User> {
    return this.$axios.$delete(`/api/v1/schools/${id}/logo`)
  },

  getImages (_, id) {
    return this.$axios.$get(`/api/v1/schools/${id}/images`)
  },

  async uploadImage ({ getters, dispatch }, { id, file }) {
    const formData = new FormData()
    const compressedFile = await dispatch('helper/compressImage', { file, fileType: 'image/webp' }, { root: true })
    formData.append('file', compressedFile, 'image.webp')
    return this.$axios.$post(`/api/v1/schools/${id}/images`, formData, { headers: getters.multipartHeaders })
  },

  removeImage (_, { id, imageId }) {
    return this.$axios.$delete(`/api/v1/schools/${id}/images/${imageId}`)
  },
}

import { ActionTree } from 'vuex'
import { School } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

type QueryParams = {
  page: number,
  sortBy: string,
  sortDesc: boolean,
}

type SchoolListResponse = {
  data: Array<School>,
  meta: {
    lastPage: number|string,
    total: number,
  }
}

export const actions: ActionTree<RootState, RootState> = {
  list (_, params: QueryParams): Promise<SchoolListResponse> {
    return this.$axios.$get('/api/v1/schools', {
      params,
    })
  },

  save (_, payload: School): Promise<School> {
    const data = {
      name: payload.name,
      street: payload.street,
      country: payload.country,
      city: payload.city,
      state: payload.state,
      zip: payload.zip,
      portal: payload.portal,
      portalAddress: payload.portal ? payload.portalAddress : null,
    }
    if (payload.id) {
      return this.$axios.$put(`/api/v1/schools/${payload.id}`, data)
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

  get (_, id): Promise<School> {
    return this.$axios.$get(`api/v1/schools/${id}`)
  },

  async getPassword (_, id): Promise<String> {
    const res = await this.$axios.$get(`api/v1/schools/${id}/password`)
    return String(res)
  },
}

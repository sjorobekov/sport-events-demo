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

  get (_, id): Promise<School> {
    return this.$axios.$get(`api/v1/schools/${id}`)
  },
}

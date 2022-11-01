import { ActionTree } from 'vuex'
import { PaginatedList, SportsRecord } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

type QueryParams = {
  page: number,
  orderBy: string,
  orderDesc: boolean,
  limit?: number,
}

type ListPayload = {
  schoolId: string
  params: QueryParams
}

export const actions: ActionTree<RootState, RootState> = {
  list (_, { schoolId, params }: ListPayload): Promise<PaginatedList<SportsRecord>> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/sports_records`, { params })
  },

  save (_, payload: SportsRecord): Promise<SportsRecord> {
    const { id, schoolId, ...data } = payload

    if (payload.id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/sports_records/${id}`, data)
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/sports_records`, data)
  },

  get (_, { schoolId, id }): Promise<SportsRecord> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/sports_records/${id}`)
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/sports_records/${id}`)
  },
}

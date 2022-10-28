import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { PaginatedList, Announcement } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {}

export const getters: GetterTree<RootState, RootState> = {}

type QueryParams = {
  page: number,
}

type ListPayload = {
  schoolId: string
  params: QueryParams
}

export const actions: ActionTree<RootState, RootState> = {
  list (_, { schoolId, params }: ListPayload): Promise<PaginatedList<Announcement>> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/announcements`, { params })
  },

  save (_, payload: Announcement): Promise<Announcement> {
    const { id, schoolId } = payload

    const data = {
      subject: payload.subject,
      body: payload.body,
    }

    if (payload.id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/announcements/${id}`, data)
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/announcements`, data)
  },

  get (_, { schoolId, id }): Promise<Announcement> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/announcements/${id}`)
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/announcements/${id}`)
  },
}

import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { SchoolRequest } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {}

export const actions: ActionTree<RootState, RootState> = {
  list (_, { params }): Promise<Array<SchoolRequest>> {
    return this.$axios.$get('/api/v1/school_requests', { params })
  },

  save (_, { id, ...payload }: SchoolRequest): Promise<SchoolRequest> {
    if (id) {
      return this.$axios.$put(`/api/v1/school_requests/${id}`, payload)
    }

    return this.$axios.$post('/api/v1/school_requests', payload)
  },

  confirmation (_, { id, ...payload }: SchoolRequest): Promise<SchoolRequest> {
    return this.$axios.$patch(`/api/v1/school_requests/${id}/confirmation`, payload)
  },

  get (_, { id }: { id: string }): Promise<SchoolRequest> {
    return this.$axios.$get(`api/v1/school_requests/${id}`)
  },

  remove (_, { id }: { id: string }): Promise<void> {
    return this.$axios.$delete(`api/v1/school_requests/${id}`)
  },
}

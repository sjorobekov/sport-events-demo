import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Dictionary, SchoolRequest } from '~/types'

export const state = () => ({
  indexed: {} as Dictionary<SchoolRequest>,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  cache (state, item: SchoolRequest): void {
    state.indexed[item.id] = item
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async list (_, { params }): Promise<Array<SchoolRequest>> {
    const data: SchoolRequest[] = await this.$axios.$get('/api/v1/school_requests', { params })

    return data
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

  async fetch ({ commit, state, dispatch }, { id }): Promise<SchoolRequest> {
    if (!state.indexed[id]) {
      const data = await dispatch('get', { id })
      commit('cache', data)
    }

    return state.indexed[id]
  },

  remove (_, { id }: { id: string }): Promise<void> {
    return this.$axios.$delete(`api/v1/school_requests/${id}`)
  },
}

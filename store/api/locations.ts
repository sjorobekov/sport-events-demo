import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Dictionary, Location } from '~/types'

export const state = () => ({
  indexed: {} as Dictionary<Location>,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  cache (state, item: Location): void {
    state.indexed[item.id] = item
  },
}

type ListPayload = {
  schoolId: string,
}

export const actions: ActionTree<RootState, RootState> = {
  async list ({ commit }, { schoolId }: ListPayload): Promise<Array<Location>> {
    const items: Location[] = await this.$axios.$get(`/api/v1/schools/${schoolId}/locations`)
    items.forEach((item) => {
      commit('cache', item)
    })
    return items
  },

  save (_, { id, schoolId, ...payload }: Location): Promise<Location> {
    const data = {
      address: payload.address,
      name: payload.name,
      coordinates: payload.coordinates,
    }
    if (id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/locations/${id}`, data)
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/locations`, data)
  },

  get (_, { schoolId, id }): Promise<Location> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/locations/${id}`)
  },

  getPublic (_, id: string): Promise<Location> {
    return this.$axios.$get(`api/v1/locations/${id}`)
  },

  async fetch ({ commit, state, dispatch }, id): Promise<Location> {
    if (!state.indexed[id]) {
      const data = await dispatch('getPublic', id)
      commit('cache', data)
    }

    return state.indexed[id]
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/locations/${id}`)
  },
}

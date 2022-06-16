import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Dictionary, Sport } from '~/types'

export const state = () => ({
  indexed: {} as Dictionary<Sport>,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  multipartHeaders: () => ({ 'Content-Type': 'multipart/form-data' }),
}

export const mutations: MutationTree<RootState> = {
  cache (state, item: Sport): void {
    state.indexed[item.id] = item
  },
}

export const actions: ActionTree<RootState, RootState> = {
  list (_): Promise<Array<Sport>> {
    return this.$axios.$get('/api/v1/sports')
  },

  save ({ getters }, payload: Sport): Promise<Sport> {
    const formData = new FormData()

    formData.append('name', payload.name)
    formData.append('color', payload.color)

    if (payload.file) {
      formData.append('file', payload.file, 'icon.svg')
    }

    if (payload.id) {
      return this.$axios.$put(`/api/v1/sports/${payload.id}`, formData, { headers: getters.multipartHeaders })
    }

    return this.$axios.$post('/api/v1/sports', formData, { headers: getters.multipartHeaders })
  },

  get (_, id): Promise<Sport> {
    return this.$axios.$get(`api/v1/sports/${id}`)
  },

  async fetch ({ commit, state, dispatch }, id): Promise<Sport> {
    if (!state.indexed[id]) {
      const data = await dispatch('get', id)
      commit('cache', data)
    }

    return state.indexed[id]
  },

  remove (_, id): Promise<void> {
    return this.$axios.$delete(`api/v1/sports/${id}`)
  },

  uploadIcon ({ getters }, { id, file }) : Promise<Sport> {
    const formData = new FormData()
    formData.append('file', file)
    return this.$axios.$post(`/api/v1/sports/${id}/icon`, formData, { headers: getters.multipartHeaders })
  },

  removeIcon (_, id): Promise<Sport> {
    return this.$axios.$delete(`/api/v1/sports/${id}/icon`)
  },
}

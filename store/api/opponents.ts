import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Dictionary, Opponent, School } from '~/types'

export const state = () => ({
  indexed: {} as Dictionary<Opponent>,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  cache (state, item: Opponent): void {
    state.indexed[item.id] = item
  },
}

type SearchPayload = {
  schoolId: string,
  params: {
    search: string,
  }
}

type SearchResponse = {
  schools: School[],
  opponents: Opponent[],
}

export const actions: ActionTree<RootState, RootState> = {
  search (_, { schoolId, params }: SearchPayload): Promise<SearchResponse> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/opponents/search`, {
      params,
    })
  },

  async list (_, { schoolId }: { schoolId: string }): Promise<Array<Opponent>> {
    const items: Opponent[] = await this.$axios.$get(`/api/v1/schools/${schoolId}/opponents`)

    return items.map((item) => {
      item.name = item.opponentSchool ? item.opponentSchool.name : item.name
      return item
    })
  },

  save (_, { id, schoolId, ...payload }: Opponent): Promise<Opponent> {
    const req = {
      name: payload.name,
      address: payload.address,
    }

    if (id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/opponents/${id}`, req)
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/opponents`, req)
  },

  get (_, { schoolId, id }: { schoolId: string, id: string }): Promise<Opponent> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/opponents/${id}`)
  },

  async fetch ({ commit, state, dispatch }, { schoolId, id }): Promise<Opponent> {
    if (!state.indexed[id]) {
      const data = await dispatch('get', { schoolId, id })
      commit('cache', data)
    }

    return state.indexed[id]
  },

  remove (_, { schoolId, id }: { schoolId: string, id: string }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/opponents/${id}`)
  },
}

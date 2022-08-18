import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Dictionary, inHouseCompetitions } from '~/types'

export const state = () => ({
  indexed: {} as Dictionary<inHouseCompetitions>,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  cache (state, item: inHouseCompetitions): void {
    state.indexed[item.id] = item
  },
}

export const getters: GetterTree<RootState, RootState> = {
}

type ListPayload = {
  schoolId: string,
  params: {
    seasonId: string,
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async list ({ commit }, { schoolId, params }: ListPayload): Promise<Array<inHouseCompetitions>> {
    const items: inHouseCompetitions[] = await this.$axios.$get(`/api/v1/schools/${schoolId}/in_house_competitions`, { params })
    items.forEach((item) => {
      commit('cache', item)
    })
    return items
  },

  get (_, { schoolId, id }): Promise<inHouseCompetitions> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/in_house_competitions/${id}`)
  },

  async fetch ({ commit, state, dispatch }, { schoolId, id }): Promise<inHouseCompetitions> {
    if (!state.indexed[id]) {
      const data = await dispatch('get', { schoolId, id })
      commit('cache', data)
    }

    return state.indexed[id]
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/in_house_competitions/${id}`)
  },
}

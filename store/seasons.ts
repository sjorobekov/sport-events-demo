import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Season } from '~/types'

export const state = () => ({
  list: [] as Season[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  current: state => state.list.find(item => item.status === 'CURRENT'),
  all: state => state.list,
  byId: state => (id: string) => state.list.find(season => season.id === id),
  byDate: state => (date: string) => state.list.find(season => season.start <= date && season.end >= date),
}

export const mutations: MutationTree<RootState> = {
  seasons (state, seasons: Season[]) {
    state.list = seasons
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetch ({ commit, dispatch }): Promise<void> {
    const seasons = await dispatch('api/seasons/list', {}, { root: true })
    commit('seasons', seasons)
  },

  async getBySchoolDate ({ dispatch }, { schoolId, date }) {
    const seasons = await dispatch('api/seasons/getBySchool', { schoolId }, { root: true })
    return seasons.find((season: Season) => season.start <= date && season.end >= date)
  },
}

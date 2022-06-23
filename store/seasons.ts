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
}

export const mutations: MutationTree<RootState> = {
  seasons (state, seasons: Season[]) {
    state.list = seasons
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetch ({ commit }): Promise<void> {
    const seasons = await this.$axios.$get('/api/v1/seasons')
    commit('seasons', seasons)
  },
}

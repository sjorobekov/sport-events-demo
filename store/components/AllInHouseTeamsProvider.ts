import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { InHouseTeam } from '~/types'

export const state = () => ({
  isFetching: false,
  teams: [] as InHouseTeam[],
  fetched: false,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  isFetching (state, val: boolean) {
    state.isFetching = val
  },
  teams (state, teams: InHouseTeam[]) {
    state.teams = teams
  },
  fetched (state, val: boolean) {
    state.fetched = val
  },
}

export const getters: GetterTree<RootState, RootState> = {
  teams (state) {
    return state.teams
  },
  isFetching (state) {
    return state.isFetching
  },
  fetched (state) {
    return state.fetched
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchData ({ commit, getters, dispatch, rootGetters }): Promise<void> {
    if (getters.isFetching || getters.fetched) {
      return
    }

    commit('isFetching', true)
    const contextSchoolId = rootGetters['context/schoolId']

    const teams = await dispatch('api/inHouseTeams/list', {
      schoolId: contextSchoolId,
    }, { root: true })
      .finally(() => {
        commit('isFetching', false)
      })
    commit('fetched', true)
    commit('teams', teams)
  },
}

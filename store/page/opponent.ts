import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Opponent, SportsContact } from '~/types'

export const state = () => ({
  opponent: {} as Opponent,
  contacts: [] as Array<SportsContact>,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  opponent (state, opponent: Opponent) {
    state.opponent = opponent
  },

  contacts (state, contacts: Array<SportsContact>) {
    state.contacts = contacts
  },
}

export const getters: GetterTree<RootState, RootState> = {
  opponent (state) {
    return state.opponent
  },

  contacts (state) {
    return state.contacts
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchData ({ commit, dispatch, rootGetters }, opponentId: string): Promise<void> {
    const contextSchoolId = rootGetters['context/schoolId']
    const opponent = await dispatch('api/opponents/fetch', { schoolId: contextSchoolId, id: opponentId }, { root: true })
    const contacts = opponent.opponentSchoolId
      ? await dispatch('api/sportsContacts/list', { schoolId: opponent.opponentSchoolId }, { root: true })
      : []

    commit('opponent', opponent)
    commit('contacts', contacts)
  },
}

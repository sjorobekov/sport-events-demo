import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { School } from '~/types'

export const state = () => ({
  id: '' as string,
  school: {} as School,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  id: state => state.id,
  school: state => state.school,
}

export const mutations: MutationTree<RootState> = {
  id (state, id: string) {
    state.id = id
  },
  school (state, school: School) {
    state.school = school
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetch ({ dispatch, commit }, id: string) {
    commit('id', id)
    const school = await dispatch('api/schools/get', id, { root: true })
    commit('school', school)
  },
}

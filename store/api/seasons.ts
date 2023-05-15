import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { PaginatedList, Season } from '~/types'
export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {}

export const getters: GetterTree<RootState, RootState> = {}

export const actions: ActionTree<RootState, RootState> = {
  list ({ rootGetters }): Promise<PaginatedList<Season>> {
    const contextSchoolId = rootGetters['context/schoolId']
    return this.$axios.$get(`/api/v1/schools/${contextSchoolId}/seasons`)
  },

  save ({ rootGetters }, payload: Season): Promise<Season> {
    const { id, schoolId, ...data } = payload

    if (payload.id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/seasons/${id}`, data)
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/seasons`, {
      schoolId: rootGetters['context/schoolId'],
      ...data,
    })
  },

  get (_, { schoolId, id }): Promise<Season> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/seasons/${id}`)
  },
}

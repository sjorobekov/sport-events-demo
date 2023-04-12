import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { TariffPlan } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {}

export const actions: ActionTree<RootState, RootState> = {
  list (_): Promise<Array<TariffPlan>> {
    return this.$axios.$get('/api/v1/tariff_plans')
  },

  update (_, payload: TariffPlan): Promise<TariffPlan> {
    const { id, ...data } = payload
    return this.$axios.$put(`/api/v1/tariff_plans/${id}`, data)
  },

  get (_, id): Promise<TariffPlan> {
    return this.$axios.$get(`api/v1/tariff_plans/${id}`)
  },

  remove (_, id): Promise<void> {
    return this.$axios.$delete(`api/v1/tariff_plans/${id}`)
  },

  refresh (): Promise<TariffPlan[]> {
    return this.$axios.$post('/api/v1/tariff_plans/refresh')
  },
}

import { ActionTree } from 'vuex'
export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  generatePayLink ({ rootGetters }, payload: { planId: string, returnUrl: string }): Promise<void> {
    const schoolId = rootGetters['context/schoolId']
    return this.$axios.$post(`/api/v1/schools/${schoolId}/generate_pay_link`, payload)
  },
}

import { ActionTree } from 'vuex'
export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  generatePayLink (_, signedUrl: string): Promise<void> {
    return this.$axios.$post(signedUrl)
  },

  makePayLinkSignedUrl ({ rootGetters }, payload: { planId: string, returnUrl: string }): Promise<string> {
    const schoolId = rootGetters['context/schoolId']
    return this.$axios.$post(`/api/v1/schools/${schoolId}/make_signed_pay_link_url`, payload)
  },
}

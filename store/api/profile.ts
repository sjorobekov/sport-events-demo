import { ActionTree } from 'vuex'
export const state = () => ({})

export type RootState = ReturnType<typeof state>

type ChangePasswordPayload = {
  currentPassword: string,
  password: string,
}

export const actions: ActionTree<RootState, RootState> = {
  changePassword (_, payload: ChangePasswordPayload): Promise<void> {
    return this.$axios.$post('/api/v1/profile/password', payload)
  },
}

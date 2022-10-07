import { ActionTree, GetterTree } from 'vuex'
import { UserRole } from '~/enum'
export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  multipartHeaders: () => ({ 'Content-Type': 'multipart/form-data' }),
}

type SchoolSignUpPayload = {
  user: {
    firstname: string,
    lastname: string,
    password: string,
  }

  school: {
    name: string,
    city: string,
    portalAddress: string,
    color: string,
  }

  invites: Array<{ email: string, userRole: UserRole }>

  file?: Blob
}

export const actions: ActionTree<RootState, RootState> = {
  schoolSignUp ({ rootGetters, getters }, payload: SchoolSignUpPayload): Promise<void> {
    const { file, ...data } = payload
    const formData = new FormData()
    if (file) {
      const extension = rootGetters['helper/extension'](file.type)
      formData.append('file', file, `file.${extension}`)
    }
    formData.append('data', JSON.stringify(data))

    return this.$axios.$post('/api/v1/signup', formData, { headers: getters.multipartHeaders })
  },
}

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

type SchoolByEmailDomainResponse = {
  id: string,
  name: string,
  city: string,
  country: string,
  logo: string,
  portal: string,
  hasAdmin?: boolean,
}

type ClaimSchoolPayload = {
  email: string,
  firstname: string,
  lastname: string,
  schoolId: string,
}

type RequestToJoinPayload = {
  email: string,
  firstname: string,
  lastname: string,
  schoolId: string,
}

type RequestAddSchoolPayload = {
  schoolId: string,
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

  checkSchoolByEmailDomain (_, emailDomain: string): Promise<SchoolByEmailDomainResponse | null> {
    return this.$axios.$get(`/api/v1/signup/school/${emailDomain}`)
  },

  requestToJoin (_, payload: RequestToJoinPayload) {
    return this.$axios.$post('/api/v1/signup/request_to_join', payload)
  },

  claimSchool (_, payload: ClaimSchoolPayload) {
    return this.$axios.$post('/api/v1/signup/claim_school', payload)
  },

  requestAddSchool (_, payload: RequestAddSchoolPayload) {
    return this.$axios.$post('/api/v1/signup/request_add_school', payload)
  },
}

import { ActionTree, GetterTree } from 'vuex'
import { User } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

type QueryParams = {
  page: number,
  sortBy: string,
  sortDesc: boolean,
}

type UserListResponse = {
  data: Array<User>,
  meta: {
    lastPage: number|string,
    total: number,
  }
}

type ListPayload = {
  schoolId: string
  params: QueryParams
}

export const getters: GetterTree<RootState, RootState> = {
  multipartHeaders: () => ({ 'Content-Type': 'multipart/form-data' }),
}

export const actions: ActionTree<RootState, RootState> = {
  list (_, { schoolId, params }: ListPayload): Promise<UserListResponse> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/users`, {
      params,
    })
  },

  save (_, payload: User): Promise<User> {
    const { id, schoolId } = payload

    const data = {
      email: payload.email,
      firstname: payload.firstname,
      lastname: payload.lastname,
      displayName: payload.displayName,
      phone: payload.phone,
      jobRole: payload.jobRole,
      userRole: payload.userRole,
    }

    if (payload.id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/users/${id}`, data)
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/users`, data)
  },

  updateStatus (_, { id, schoolId, enabled }): Promise<User> {
    return this.$axios.$patch(`/api/v1/schools/${schoolId}/users/${id}/status`, { enabled })
  },

  sendResetPasswordEmail (_, { id, schoolId }): Promise<User> {
    return this.$axios.$post(`/api/v1/schools/${schoolId}/users/${id}/resetPassword`)
  },

  get (_, { schoolId, id }): Promise<User> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/users/${id}`)
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/users/${id}`)
  },

  uploadAvatar (_, { schoolId, id, file }): Promise<User> {
    const formData = new FormData()

    formData.append('file', file, 'avatar.webp')

    return this.$axios.$post(`/api/v1/schools/${schoolId}/users/${id}/avatar`, formData, { headers: getters.multipartHeaders })
  },

  removeAvatar (_, { schoolId, id }): Promise<User> {
    return this.$axios.$delete(`/api/v1/schools/${schoolId}/users/${id}/avatar`)
  },
}

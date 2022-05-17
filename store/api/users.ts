import { ActionTree } from 'vuex'
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

export const actions: ActionTree<RootState, RootState> = {
  list (_, { schoolId, params }: ListPayload): Promise<UserListResponse> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/users`, {
      params,
    })
  },

  save (_, payload: User): Promise<User> {
    const { id, schoolId } = payload
    const data = {

    }
    if (payload.id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/users/${id}`, data)
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/users`, data)
  },

  get (_, { schoolId, id }): Promise<User> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/users/${id}`)
  },
}

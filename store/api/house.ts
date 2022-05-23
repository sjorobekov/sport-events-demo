import { ActionTree } from 'vuex'
import { House } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

type QueryParams = {
  page: number,
  sortBy: string,
  sortDesc: boolean,
}

type ListPayload = {
  schoolId: string
  params: QueryParams
}

export const actions: ActionTree<RootState, RootState> = {
  list (_, { schoolId }: ListPayload): Promise<Array<House>> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/houses`)
  },

  save (_, payload: House): Promise<House> {
    const { id, schoolId } = payload

    const data = {
      name: payload.name,
      color: payload.color,
    }

    if (payload.id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/houses/${id}`, data)
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/houses`, data)
  },

  get (_, { schoolId, id }): Promise<House> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/houses/${id}`)
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/houses/${id}`)
  },
}

import { ActionTree, GetterTree } from 'vuex'
import { Location } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

type ListPayload = {
  schoolId: string,
}

export const actions: ActionTree<RootState, RootState> = {
  list (_, { schoolId }: ListPayload): Promise<Array<Location>> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/locations`)
  },

  save (_, { id, schoolId, ...payload }: Location): Promise<Location> {
    const data = {
      address: payload.address,
      name: payload.name,
      coordinates: payload.coordinates,
    }
    if (id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/locations/${id}`, data)
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/locations`, data)
  },

  get (_, { schoolId, id }): Promise<Location> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/locations/${id}`)
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/locations/${id}`)
  },
}

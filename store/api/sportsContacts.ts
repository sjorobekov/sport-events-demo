import { ActionTree, GetterTree } from 'vuex'
import { SportsContact } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  multipartHeaders: () => ({ 'Content-Type': 'multipart/form-data' }),
}

type ListPayload = {
  schoolId: string
}

export const actions: ActionTree<RootState, RootState> = {
  list (_, { schoolId }: ListPayload): Promise<Array<SportsContact>> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/sports_contacts`)
  },

  save (_, payload: SportsContact): Promise<SportsContact> {
    const { id, schoolId } = payload

    const formData = new FormData()
    formData.append('name', payload.name)
    formData.append('role', payload.role)
    formData.append('email', payload.email)
    formData.append('phone', payload.phone)
    formData.append('main', payload.main.toString())
    if (payload.file) {
      formData.append('file', payload.file, 'image.webp')
    }

    if (payload.id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/sports_contacts/${id}`, formData, { headers: getters.multipartHeaders })
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/sports_contacts`, formData, { headers: getters.multipartHeaders })
  },

  get (_, { schoolId, id }): Promise<SportsContact> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/sports_contacts/${id}`)
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/sports_contacts/${id}`)
  },
}

import { ActionTree } from 'vuex'
import { SportsRecordCategory } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

type ListPayload = {
  schoolId: string
}

export const actions: ActionTree<RootState, RootState> = {
  list (_, { schoolId }: ListPayload): Promise<Array<SportsRecordCategory>> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/sports_record_categories`)
  },

  save (_, payload: SportsRecordCategory): Promise<SportsRecordCategory> {
    const { id, schoolId } = payload

    const data = {
      name: payload.name,
    }

    if (payload.id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/sports_record_categories/${id}`, data)
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/sports_record_categories`, data)
  },

  get (_, { schoolId, id }): Promise<SportsRecordCategory> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/sports_record_categories/${id}`)
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/sports_record_categories/${id}`)
  },
}

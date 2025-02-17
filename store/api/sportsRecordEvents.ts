import { ActionTree } from 'vuex'
import { SportsRecordEvent } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

type ListPayload = {
  schoolId: string
  params: {
    sportId: string
  }
}

export const actions: ActionTree<RootState, RootState> = {
  list (_, { schoolId, params }: ListPayload): Promise<Array<SportsRecordEvent>> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/sports_record_events`, { params })
  },

  save (_, payload: SportsRecordEvent): Promise<SportsRecordEvent> {
    const { id, schoolId, ...data } = payload

    if (payload.id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/sports_record_events/${id}`, data)
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/sports_record_events`, data)
  },

  get (_, { schoolId, id }): Promise<SportsRecordEvent> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/sports_record_events/${id}`)
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/sports_record_events/${id}`)
  },
}

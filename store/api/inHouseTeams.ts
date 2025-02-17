import { ActionTree } from 'vuex'
import { InHouseTeam } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

type ListPayload = {
  schoolId: string
}

export const actions: ActionTree<RootState, RootState> = {
  list (_, { schoolId }: ListPayload): Promise<Array<InHouseTeam>> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/in_house_teams`)
  },

  save (_, payload: InHouseTeam): Promise<InHouseTeam> {
    const { id, schoolId } = payload

    const data = {
      name: payload.name,
      color: payload.color,
    }

    if (payload.id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/in_house_teams/${id}`, data)
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/in_house_teams`, data)
  },

  get (_, { schoolId, id }): Promise<InHouseTeam> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/in_house_teams/${id}`)
  },

  getLastSheet (_, { schoolId, id, inHouseEventId }: { schoolId: string, inHouseEventId: string, id: string }): Promise<any[]> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/in_house_teams/${id}/sheets`, { params: { inHouseEventId } })
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/in_house_teams/${id}`)
  },
}

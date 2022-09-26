import { ActionTree, GetterTree } from 'vuex'
import { InHouseEvent } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
}

type ListByTeamPayload = {
  schoolId: string
  inHouseCompetitionId: string
}

export const actions: ActionTree<RootState, RootState> = {
  async getByCompetition (_, { schoolId, inHouseCompetitionId }: ListByTeamPayload): Promise<InHouseEvent[]> {
    const data: InHouseEvent[] = await this.$axios.$get(`/api/v1/schools/${schoolId}/in_house_competitions/${inHouseCompetitionId}/in_house_events`)

    return data
  },

  async get (_, { schoolId, inHouseCompetitionId, id }): Promise<InHouseEvent> {
    const event: InHouseEvent = await this.$axios.$get(`/api/v1/schools/${schoolId}/in_house_competitions/${inHouseCompetitionId}/in_house_events/${id}`)
    return event
  },

  create (_, { matches, event, schoolId, inHouseCompetitionId }): Promise<InHouseEvent> {
    return this.$axios.$post(`/api/v1/schools/${schoolId}/in_house_competitions/${inHouseCompetitionId}/in_house_events`, {
      ...event,
      matches,
    })
  },

  getTeamSheet (_, { schoolId, inHouseCompetitionId, id }): Promise<any[]> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/in_house_competitions/${inHouseCompetitionId}/in_house_matches/${id}/team_sheets`)
  },

  saveTeamSheet (_, { schoolId, inHouseCompetitionId, inHouseTeamId, id, sheet }: { schoolId: string, inHouseCompetitionId: string, inHouseTeamId: string, id: string, sheet: String[]}) {
    return this.$axios.$post(`/api/v1/schools/${schoolId}/in_house_competitions/${inHouseCompetitionId}/in_house_matches/${id}/team_sheets`, {
      inHouseTeamId,
      sheet,
    })
  },

  remove (_, { schoolId, inHouseCompetitionId, id }): Promise<void> {
    return this.$axios.$delete(`/api/v1/schools/${schoolId}/in_house_competitions/${inHouseCompetitionId}/in_house_events/${id}`)
  },
}

import { ActionTree, GetterTree } from 'vuex'
import { InHouseEventResult, InHouseMatch, PaginatedList } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

type StoreResultPayload = {
  homeScore: string,
  awayScore: string,
  overallResult: InHouseEventResult
  resultNotes: string
}

export const getters: GetterTree<RootState, RootState> = {
}

type ListByTeamPayload = {
  schoolId: string
  inHouseCompetitionId: string
}

type ListBySchoolPayload = {
  schoolId: string
}

export const actions: ActionTree<RootState, RootState> = {
  getByCompetition (_, { schoolId, inHouseCompetitionId }: ListByTeamPayload): Promise<InHouseMatch[]> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/in_house_competitions/${inHouseCompetitionId}/in_house_matches`)
  },

  getBySchool (_, { schoolId }: ListBySchoolPayload): Promise<PaginatedList<InHouseMatch>> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/in_house_matches`)
  },

  async get (_, { schoolId, inHouseCompetitionId, id }): Promise<InHouseMatch> {
    const match: InHouseMatch = await this.$axios.$get(`/api/v1/schools/${schoolId}/in_house_competitions/${inHouseCompetitionId}/in_house_matches/${id}`)
    return match
  },

  async storeResult (_, { schoolId, inHouseCompetitionId, id, formData }: { schoolId: string, inHouseCompetitionId: string, id: string, formData: StoreResultPayload }): Promise<InHouseMatch> {
    const match: InHouseMatch = await this.$axios.$post(`/api/v1/schools/${schoolId}/in_house_competitions/${inHouseCompetitionId}/in_house_matches/${id}/results`, formData)
    return match
  },
}

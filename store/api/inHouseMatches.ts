import { ActionTree, GetterTree } from 'vuex'
import { InHouseEventLocationType } from '~/enum'
import { InHouseEventResult, InHouseMatch, PaginatedList } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
}

type ListByTeamPayload = {
  schoolId: string
  inHouseCompetitionId: string
}

type QueryParams = {
  page: number,
  limit?: number,
  from?: string,
  to?:string,
}

type ListBySchoolPayload = {
  schoolId: string
  params: QueryParams
}

type StoreResultPayload = {
  homeScore: string,
  awayScore: string,
  overallResult: InHouseEventResult
  resultNotes: string
}

type UpdateMatchPayload = {
  leadId?: string,
  info?: string,
  date?: string,
  startTime?: string,
  finishTime?: string,
  location?: InHouseEventLocationType,
  sportLocationId?: string,
  otherLocation?: string,
}

export const actions: ActionTree<RootState, RootState> = {
  getByCompetition (_, { schoolId, inHouseCompetitionId }: ListByTeamPayload): Promise<InHouseMatch[]> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/in_house_competitions/${inHouseCompetitionId}/in_house_matches`)
  },

  getBySchool (_, { schoolId, params }: ListBySchoolPayload): Promise<PaginatedList<InHouseMatch>> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/in_house_matches`, { params })
  },

  get (_, { schoolId, inHouseCompetitionId, id }): Promise<InHouseMatch> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/in_house_competitions/${inHouseCompetitionId}/in_house_matches/${id}`)
  },

  storeResult (_, { schoolId, inHouseCompetitionId, id, formData }: { schoolId: string, inHouseCompetitionId: string, id: string, formData: StoreResultPayload }): Promise<InHouseMatch> {
    return this.$axios.$post(`/api/v1/schools/${schoolId}/in_house_competitions/${inHouseCompetitionId}/in_house_matches/${id}/results`, formData)
  },

  updateMatch (_, { schoolId, inHouseCompetitionId, id, formData }: { schoolId: string, inHouseCompetitionId: string, id: string, formData: UpdateMatchPayload }): Promise<InHouseMatch> {
    return this.$axios.$put(`/api/v1/schools/${schoolId}/in_house_competitions/${inHouseCompetitionId}/in_house_matches/${id}`, formData)
  },
}

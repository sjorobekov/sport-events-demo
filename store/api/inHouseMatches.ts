import { ActionTree, GetterTree } from 'vuex'
import { InHouseMatch, PaginatedList } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

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
}

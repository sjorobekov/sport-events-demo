import { ActionTree, GetterTree } from 'vuex'
import { EventResult } from '~/enum'
import { InHouseEvent, InHouseEventResult } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
}

type ListByTeamPayload = {
  schoolId: string
  inHouseCompetitionId: string
}

type StoreResultPayload = {
  results: Array<InHouseEventResult>
  overallResult: EventResult
  resultNotes: string
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

  remove (_, { schoolId, inHouseCompetitionId, id }): Promise<void> {
    return this.$axios.$delete(`/api/v1/schools/${schoolId}/in_house_competitions/${inHouseCompetitionId}/in_house_events/${id}`)
  },

  async storeResult (_, { schoolId, inHouseCompetitionId, id, formData }: { schoolId: string, inHouseCompetitionId: string, id: string, formData: StoreResultPayload }): Promise<Event> {
    const event: Event = await this.$axios.$post(`/api/v1/schools/${schoolId}/in_house_competitions/${inHouseCompetitionId}/in_house_events/${id}/results`, formData)

    return event
  },
}

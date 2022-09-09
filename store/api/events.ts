import { ActionTree, GetterTree } from 'vuex'
import { PaginatedList, Event, CreateEventPayload, CreateEventBatchPayload, Student } from '~/types'
import { EventResult, EventStatus, Gender } from '@/enum'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  yearGroupOptions () {
    const options = []
    for (let i = 1; i <= 13; i++) {
      options.push({ text: `Year ${i}`, value: i })
    }
    return options
  },
  genderOptions: () => ([
    { text: 'Male', value: Gender.MALE },
    { text: 'Female', value: Gender.FEMALE },
  ]),
}

type QueryParams = {
  page: number,
  limit?: number,
  orderBy?: 'date',
  orderDesc?: boolean,
  teamId?: string,
  status?: EventStatus,
  from?: string,
  to?:string,
}

type ListPayload = {
  schoolId: string
  params: QueryParams
}

type ListByTeamPayload = {
  schoolId: string
  teamId: string
}

type CheckEventConflictPayload = {
  schoolId: string,
  date: string,
  startTime: string,
  sportLocationId: string,
  teamId: string,
  leadId: string,
  returnTime: string,
}

type EventConflictResponse = {
  status: 'OK' | 'CONFLICT',
  message: string,
  events: Array<{
    eventId: string,
    eventType: string,
    startTime: string,
    name?: string
    sportLocation?: object,
    team?: object,
    lead?: object,
  }>
}

type EventConfirmationPayload = {
  status?: EventStatus,
  leadId?: string,
  teamId?: string,
  meetTime?: string,
  returnTime?: string,
  sportLocationId?: string,
  eventId: string,
  schoolId: string,
}

type StoreResultItem = {
  result: EventResult,
  score: number,
  opponentScore?: number,
  opponentId?: number,
  opponentSchoolId?: number,
  round?: string,
  notes?: string,
}

type StoreResultPayload = {
  results: Array<StoreResultItem>
}

export const actions: ActionTree<RootState, RootState> = {
  async getBySchool (_, { schoolId, params }: ListPayload): Promise<PaginatedList<Event>> {
    const { data, meta }: PaginatedList<Event> = await this.$axios.$get(`/api/v1/schools/${schoolId}/events`, { params })

    data.forEach((event) => {
      event.participants.forEach((participant) => {
        if (participant?.schoolId === schoolId) {
          event.me = participant
        } else {
          event.opponent = participant
        }
      })
    })

    return {
      data,
      meta,
    }
  },

  async getByTeam (_, { schoolId, teamId }: ListByTeamPayload): Promise<Event[]> {
    const data: Event[] = await this.$axios.$get(`/api/v1/schools/${schoolId}/teams/${teamId}/events`)

    data.forEach((event) => {
      event.participants.forEach((participant) => {
        if (participant?.schoolId === schoolId) {
          event.me = participant
        } else {
          event.opponent = participant
        }
      })
    })

    return data
  },

  create (_, { me, opponent, event, schoolId }: CreateEventPayload): Promise<Event> {
    return this.$axios.$post(`/api/v1/schools/${schoolId}/events`, {
      me,
      opponent,
      event,
    })
  },

  createBatch (_, { events, schoolId }: CreateEventBatchPayload): Promise<void> {
    const payload = events.map((item) => {
      return {
        event: item.event,
        me: item.me,
        opponent: item.opponent,
      }
    })
    return this.$axios.$post(`/api/v1/schools/${schoolId}/events/batch`, {
      events: payload,
    })
  },

  checkConflict (_, { schoolId, ...payload }: CheckEventConflictPayload): Promise<EventConflictResponse> {
    return this.$axios.$post(`/api/v1/schools/${schoolId}/events/check_conflict`, payload)
  },

  confirm (_, { schoolId, eventId, ...payload }: EventConfirmationPayload): Promise<Event> {
    return this.$axios.$patch(`/api/v1/schools/${schoolId}/events/${eventId}/confirmation`, payload)
  },

  async get (_, { schoolId, id }): Promise<Event> {
    const event: Event = await this.$axios.$get(`/api/v1/schools/${schoolId}/events/${id}`)

    event.participants.forEach((participant) => {
      if (participant?.schoolId === schoolId) {
        event.me = participant
      } else {
        event.opponent = participant
      }
    })

    return event
  },

  getTeamSheet (_, { schoolId, id }): Promise<Student[]> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/events/${id}/team_sheets`)
  },

  saveTeamSheet (_, { schoolId, id, sheet }: { schoolId: string, id: string, sheet: String[]}) {
    return this.$axios.$post(`/api/v1/schools/${schoolId}/events/${id}/team_sheets`, {
      sheet,
    })
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`/api/v1/schools/${schoolId}/events/${id}`)
  },

  async storeResult (_, { schoolId, id, formData }: { schoolId: string, id: string, formData: StoreResultPayload }): Promise<Event> {
    const event: Event = await this.$axios.$post(`/api/v1/schools/${schoolId}/events/${id}/results`, formData)

    event.participants.forEach((participant) => {
      if (participant?.schoolId === schoolId) {
        event.me = participant
      } else {
        event.opponent = participant
      }
    })

    return event
  },
}

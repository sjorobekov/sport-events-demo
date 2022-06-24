import { ActionTree, GetterTree } from 'vuex'
import { PaginatedList, Event, CreateEventPayload, CreateEventBatchPayload } from '~/types'
import { Gender } from '@/enum'

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
  sortBy: 'firstname' | 'lastname' | 'birthday' | 'gender' | 'yearGroup',
  sortDesc: boolean,
  teamId?: string,
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

  get (_, { schoolId, id }): Promise<Event> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/events/${id}`)
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/events/${id}`)
  },
}

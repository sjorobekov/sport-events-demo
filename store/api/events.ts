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
    return this.$axios.$post(`/api/v1/schools/${schoolId}/events/batch`, {
      events,
    })
  },

  save (_, payload: Event): Promise<Event> {
    const { id } = payload

    const data = {
      name: payload.name,
      eventType: payload.eventType,
      sportId: payload.sportId,
      fixtureType: payload.fixtureType,
      date: payload.date,
      startTime: payload.startTime,
      repeats: payload.repeats,
      repeatPeriod: payload.repeatPeriod,
      repeatDays: payload.repeatDays,
      startDate: payload.startDate,
      endDate: payload.endDate,
      location: payload.location,
      sportLocationId: payload.sportLocationId,
      otherLocation: payload.otherLocation,
    }

    if (payload.id) {
      return this.$axios.$put(`/api/v1/events/${id}`, data)
    }

    return this.$axios.$post('/api/v1/events', data)
  },

  get (_, { schoolId, id }): Promise<Event> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/events/${id}`)
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/events/${id}`)
  },
}

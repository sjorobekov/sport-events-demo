import { ActionTree, GetterTree } from 'vuex'
import { PaginatedList, Event } from '~/types'
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

type ListAsSuperAdminPayload = {
  page: number,
  limit?: number,
  orderBy?: 'date',
  orderDesc?: boolean,
}

export const actions: ActionTree<RootState, RootState> = {
  list (_, params: ListAsSuperAdminPayload): Promise<PaginatedList<Event>> {
    return this.$axios.$get('/api/v1/management/events', { params })
  },

  get (_, id: string): Promise<Event> {
    return this.$axios.$get(`/api/v1/management/events/${id}`)
  },

  save (_, { id, ...payload }: Event): Promise<Event> {
    return this.$axios.$put(`/api/v1/management/events/${id}`, payload)
  },

  remove (_, id: string): Promise<void> {
    return this.$axios.$delete(`/api/v1/management/events/${id}`)
  },
}

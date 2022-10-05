import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { PaginatedList, Student, Dictionary, StudentsParticipationStatistics } from '~/types'
import { Gender } from '@/enum'

export const state = () => ({
  indexed: {} as Dictionary<Student>,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  cache (state, item: Student): void {
    state.indexed[item.id] = item
  },
}

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
  search?: string,
  limit?: number,
}

type ListPayload = {
  schoolId: string
  params: QueryParams
}

type ParticipationQueryParams = {
  page: number,
  sortBy: string,
  sortDesc: boolean,
  schoolId: string,
}

export const actions: ActionTree<RootState, RootState> = {
  async list ({ commit }, { schoolId, params }: ListPayload): Promise<PaginatedList<Student>> {
    const res: PaginatedList<Student> = await this.$axios.$get(`/api/v1/schools/${schoolId}/students`, { params })

    res.data.forEach((item) => {
      commit('cache', item)
    })

    return res
  },

  save (_, payload: Student): Promise<Student> {
    const { id, schoolId } = payload

    const data = {
      firstname: payload.firstname,
      lastname: payload.lastname,
      birthday: payload.birthday,
      yearGroup: payload.yearGroup,
      gender: payload.gender,
      inHouseTeamId: payload.inHouseTeamId,
    }

    if (payload.id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/students/${id}`, data)
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/students`, data)
  },

  get (_, { schoolId, id }): Promise<Student> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/students/${id}`)
  },

  async fetch ({ commit, state, dispatch }, { schoolId, id }): Promise<Student> {
    if (!state.indexed[id]) {
      const data = await dispatch('get', { schoolId, id })
      commit('cache', data)
    }

    return state.indexed[id]
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/students/${id}`)
  },

  getParticipation (_, { schoolId, ...params }: ParticipationQueryParams): Promise<Student[]> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/students/participation`, {
      params,
    })
  },

  getParticipationStatistics (_, { schoolId }): Promise<StudentsParticipationStatistics> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/students/participation/statistics`)
  },
}

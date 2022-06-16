import { ActionTree, GetterTree } from 'vuex'
import { PaginatedList, Student } from '~/types'
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
}

type ListPayload = {
  schoolId: string
  params: QueryParams
}

export const actions: ActionTree<RootState, RootState> = {
  list (_, { schoolId, params }: ListPayload): Promise<PaginatedList<Student>> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/students`, { params })
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

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/students/${id}`)
  },
}

import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Dictionary, Student, Team } from '~/types'
import { Gender, PublishResult } from '~/enum'

export const state = () => ({
  indexed: {} as Dictionary<Team>,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  cache (state, item: Team): void {
    state.indexed[item.id] = item
  },
}

export const getters: GetterTree<RootState, RootState> = {
  ageLevel () {
    const options = []
    for (let i = 5; i <= 18; i++) {
      options.push({ text: `Under ${i}`, value: `U${i}` })
    }
    return options
  },
  abilityLevel () {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  },
  genderOptions: () => ([
    { text: 'Male', value: Gender.MALE },
    { text: 'Female', value: Gender.FEMALE },
    { text: 'Mixed', value: Gender.MIXED },
  ]),
  publishTeamOptions: () => ([
    { text: 'Yes, team will be made public on Sports Portal', value: true },
    { text: 'No, Team will only be visible to logged in staff', value: false },
  ]),
  publishResultsOptions: () => ([
    { text: 'Yes, Publish results and match scores to Sports Portal', value: PublishResult.RESULTS_SCORES },
    { text: 'Yes, Publish results only (Win, Draw, Loss)', value: PublishResult.RESULTS },
    { text: 'No, Publish events only', value: PublishResult.EVENTS },
  ]),
  multipartHeaders: () => ({ 'Content-Type': 'multipart/form-data' }),
}

type ListPayload = {
  schoolId: string,
  params: {
    seasonId: string,
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async list ({ commit }, { schoolId, params }: ListPayload): Promise<Array<Team>> {
    const items: Team[] = await this.$axios.$get(`/api/v1/schools/${schoolId}/teams`, { params })
    items.forEach((item) => {
      commit('cache', item)
    })
    return items
  },

  save (_, payload: Team): Promise<Team> {
    const { id, schoolId } = payload

    const formData = new FormData()

    formData.append('sportId', payload.sportId)
    formData.append('seasonId', payload.seasonId)
    formData.append('age', payload.age)
    formData.append('gender', payload.gender)
    formData.append('ability', payload.ability)
    formData.append('name', payload.name)

    if (payload.coachId) {
      formData.append('coachId', payload.coachId)
    }

    formData.append('publishTeam', payload.publishTeam.toString())
    formData.append('publishResults', payload.publishResults.toString())

    if (payload.file) {
      formData.append('file', payload.file, 'image.webp')
    }

    if (payload.id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/teams/${id}`, formData, { headers: getters.multipartHeaders })
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/teams`, formData, { headers: getters.multipartHeaders })
  },

  get (_, { schoolId, id }): Promise<Team> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/teams/${id}`)
  },

  async fetch ({ commit, state, dispatch }, { schoolId, id }): Promise<Team> {
    if (!state.indexed[id]) {
      const data = await dispatch('get', { schoolId, id }).catch(() => ({ id }))
      commit('cache', data)
    }

    return state.indexed[id]
  },

  getLastSheet (_, { schoolId, id }): Promise<Student[]> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/teams/${id}/sheets`)
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/teams/${id}`)
  },
}

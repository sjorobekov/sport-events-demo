import { ActionTree, GetterTree } from 'vuex'
import { Team } from '~/types'
import { FEMALE, MALE } from '~/enum/Gender'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

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
    { text: 'Male', value: MALE },
    { text: 'Female', value: FEMALE },
  ]),
  publishTeamOptions: () => ([
    { text: 'Yes, team will be made public on Sports Portal', value: true },
    { text: 'No, Team will only be visible to logged in staff', value: false },
  ]),
  publishResultsOptions: () => ([
    { text: 'Yes, Publish results and match scores to Sports Portal', value: 'RESULTS_SCORES' },
    { text: 'Yes, Publish results only (Win, Draw, Loss)', value: 'RESULTS' },
    { text: 'No, Publish events only', value: 'EVENTS' },
  ]),
}

type ListPayload = {
  schoolId: string
}

export const actions: ActionTree<RootState, RootState> = {
  list (_, { schoolId }: ListPayload): Promise<Array<Team>> {
    return this.$axios.$get(`/api/v1/schools/${schoolId}/teams`)
  },

  save (_, payload: Team): Promise<Team> {
    const { id, schoolId } = payload

    const data = {
      sportId: payload.sportId,
      seasonId: payload.seasonId,
      gender: payload.gender,
      ageLevel: payload.ageLevel,
      abilityLevel: payload.abilityLevel,
      name: payload.name,
      coachId: payload.coachId,
      publishTeam: payload.publishTeam,
      publishResults: payload.publishResults,
    }

    const formData = new FormData()

    formData.append('sportId', payload.sportId)
    formData.append('seasonId', payload.seasonId)
    formData.append('ageLevel', payload.ageLevel)
    formData.append('abilityLevel', payload.abilityLevel)
    formData.append('name', payload.name)
    formData.append('coachId', payload.coachId)
    formData.append('publishTeam', payload.publishTeam.toString())
    formData.append('publishResults', payload.publishResults.toString())

    if (payload.file) {
      formData.append('file', payload.file, 'image.webp')
    }

    if (payload.id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/teams/${id}`, data)
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/teams`, data)
  },

  get (_, { schoolId, id }): Promise<Team> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/teams/${id}`)
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/teams/${id}`)
  },
}

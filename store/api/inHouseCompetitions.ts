import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { PublishResult } from '~/enum'
import { Dictionary, InHouseCompetition } from '~/types'

export const state = () => ({
  indexed: {} as Dictionary<InHouseCompetition>,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  cache (state, item: InHouseCompetition): void {
    state.indexed[item.id] = item
  },
}

export const getters: GetterTree<RootState, RootState> = {
  publishCompetitionOptions: () => ([
    { text: 'Yes, Competition will be made public on Sports Portal', value: true },
    { text: 'No, Competition will only be visible to logged in staff', value: false },
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
  async list ({ commit }, { schoolId, params }: ListPayload): Promise<Array<InHouseCompetition>> {
    const items: InHouseCompetition[] = await this.$axios.$get(`/api/v1/schools/${schoolId}/in_house_competitions`, { params })
    items.forEach((item) => {
      commit('cache', item)
    })
    return items
  },

  save (_, payload: InHouseCompetition): Promise<InHouseCompetition> {
    const { id, schoolId } = payload

    const formData = new FormData()

    formData.append('sportId', payload.sportId)
    formData.append('seasonId', payload.seasonId)
    formData.append('name', payload.name)

    if (payload.leadId) {
      formData.append('leadId', payload.leadId)
    }

    formData.append('publishCompetition', payload.publishCompetition.toString())
    formData.append('publishResults', payload.publishResults.toString())

    if (payload.file) {
      formData.append('file', payload.file, 'image.webp')
    }

    if (payload.id) {
      return this.$axios.$put(`/api/v1/schools/${schoolId}/in_house_competitions/${id}`, formData, { headers: getters.multipartHeaders })
    }

    return this.$axios.$post(`/api/v1/schools/${schoolId}/in_house_competitions`, formData, { headers: getters.multipartHeaders })
  },

  get (_, { schoolId, id }): Promise<InHouseCompetition> {
    return this.$axios.$get(`api/v1/schools/${schoolId}/in_house_competitions/${id}`)
  },

  async fetch ({ commit, state, dispatch }, { schoolId, id }): Promise<InHouseCompetition> {
    if (!state.indexed[id]) {
      const data = await dispatch('get', { schoolId, id })
      commit('cache', data)
    }

    return state.indexed[id]
  },

  remove (_, { schoolId, id }): Promise<void> {
    return this.$axios.$delete(`api/v1/schools/${schoolId}/in_house_competitions/${id}`)
  },
}

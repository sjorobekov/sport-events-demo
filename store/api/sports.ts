import { ActionTree, GetterTree } from 'vuex'
import { Sport } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  multipartHeaders: () => ({ 'Content-Type': 'multipart/form-data' }),
}

export const actions: ActionTree<RootState, RootState> = {
  list (_): Promise<Array<Sport>> {
    return this.$axios.$get('/api/v1/sports')
  },

  save ({ getters }, payload: Sport): Promise<Sport> {
    const data = {
      name: payload.name,
      color: payload.color,
      icon: payload.icon,
    }

    const formData = new FormData()

    formData.append('name', payload.name)
    formData.append('color', payload.color)

    if (payload.file) {
      formData.append('file', payload.file)
    }

    if (payload.id) {
      return this.$axios.$put(`/api/v1/sports/${payload.id}`, data, { headers: getters.multipartHeaders })
    }

    return this.$axios.$post('/api/v1/sports', data, { headers: getters.multipartHeaders })
  },

  get (_, id): Promise<Sport> {
    return this.$axios.$get(`api/v1/sports/${id}`)
  },

  remove (_, id): Promise<void> {
    return this.$axios.$delete(`api/v1/sports/${id}`)
  },
}

import { ActionTree } from 'vuex'
import { Sport } from '~/types'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  list (_): Promise<Array<Sport>> {
    return this.$axios.$get('/api/v1/sports')
  },

  save (_, payload: Sport): Promise<Sport> {
    const data = {
      name: payload.name,
      color: payload.color,
      icon: payload.icon,
    }
    if (payload.id) {
      return this.$axios.$put(`/api/v1/sports/${payload.id}`, data)
    }

    return this.$axios.$post('/api/v1/sports', data)
  },

  get (_, id): Promise<Sport> {
    return this.$axios.$get(`api/v1/sports/${id}`)
  },

  remove (_, id): Promise<void> {
    return this.$axios.$delete(`api/v1/sports/${id}`)
  },
}

import { UserRole } from '~/enum'

export const getters = {
  canCreateTeam (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },

  canCreateEvent (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },

  canSeeSettingsPage (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },

  role (_, _getters, _rootState, rootGetters) {
    return rootGetters['context/role']
  },
}

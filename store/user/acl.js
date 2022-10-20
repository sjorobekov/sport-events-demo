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

  canManageResult (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },

  canConfirmFixtures (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },

  canAddMissingResults (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },

  role (_, _getters, _rootState, rootGetters) {
    return rootGetters['context/role']
  },

  canCreateInHouseEvent (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },

  canCreateCompetition (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },

  canSeeOrganising (_, _getters, _rootState, rootGetters) {
    return rootGetters['context/isLoggedIn']
  },

  canManageSportLocation (_, getters) {
    return [UserRole.ADMIN, UserRole.SUPER_ADMIN].includes(getters.role)
  },

  canManageSportsRecords (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },
}

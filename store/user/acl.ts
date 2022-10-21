import { GetterTree } from 'vuex'
import { UserRole } from '~/enum'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  canCreateTeam (_, getters) {
    return [UserRole.ADMIN, UserRole.SPORTS_USER].includes(getters.role)
  },

  canCreateEvent (_, getters) {
    return [UserRole.ADMIN, UserRole.SPORTS_USER].includes(getters.role)
  },

  canSeeSettingsPage (_, getters) {
    return [UserRole.ADMIN, UserRole.SPORTS_USER].includes(getters.role)
  },

  canManageUsers (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },

  canManageStudents (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },

  canManageSchoolPrivacy (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },

  canCustomizeSchool (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },

  canManageSubscription (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },

  canManageInHouseTeams (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },

  canInviteUser (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },

  canManageResult (_, getters) {
    return [UserRole.ADMIN, UserRole.SPORTS_USER].includes(getters.role)
  },

  canConfirmFixtures (_, getters) {
    return [UserRole.ADMIN, UserRole.SPORTS_USER].includes(getters.role)
  },

  canAddMissingResults (_, getters) {
    return [UserRole.ADMIN, UserRole.SPORTS_USER].includes(getters.role)
  },

  role (_, _getters, _rootState, rootGetters) {
    return rootGetters['context/role']
  },

  canCreateInHouseEvent (_, getters) {
    return [UserRole.ADMIN, UserRole.SPORTS_USER].includes(getters.role)
  },

  canCreateCompetition (_, getters) {
    return [UserRole.ADMIN, UserRole.SPORTS_USER].includes(getters.role)
  },

  canSeeOrganising (_, _getters, _rootState, rootGetters) {
    return rootGetters['context/isLoggedIn']
  },

  canManageSportLocation (_, getters) {
    return [UserRole.ADMIN, UserRole.SUPER_ADMIN].includes(getters.role)
  },

  canManageSportsRecords (_, getters) {
    return [UserRole.ADMIN, UserRole.SPORTS_USER].includes(getters.role)
  },
}

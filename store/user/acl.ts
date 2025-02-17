import { GetterTree } from 'vuex'
import { UserRole } from '~/enum'
import { Announcement } from '~/types'

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

  canManageIntegrations (_, getters) {
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

  school (_, _getters, _rootState, rootGetters) {
    return rootGetters['context/school']
  },

  canCreateInHouseEvent (_, getters) {
    return [UserRole.ADMIN, UserRole.SPORTS_USER].includes(getters.role)
  },

  canCreateCompetition (_, getters) {
    return [UserRole.ADMIN, UserRole.SPORTS_USER].includes(getters.role)
  },

  canEditCompetition (_, getters) {
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

  canCreateAnnouncement (_, getters) {
    return [UserRole.ADMIN, UserRole.SPORTS_USER].includes(getters.role)
  },

  canEditOrRemoveAnnouncement (_, getters, _rootState, rootGetters) {
    return (announcement: Announcement) => {
      if (getters.role === UserRole.ADMIN) {
        return true
      }

      return announcement.userId === rootGetters['context/myId']
    }
  },

  canCreateOpponent (_, getters) {
    return [UserRole.ADMIN, UserRole.SPORTS_USER].includes(getters.role)
  },

  canCreateSportsContacts (_, getters) {
    return [UserRole.ADMIN, UserRole.SPORTS_USER].includes(getters.role)
  },

  canManageSeasons (_, getters) {
    return [UserRole.ADMIN].includes(getters.role)
  },
}

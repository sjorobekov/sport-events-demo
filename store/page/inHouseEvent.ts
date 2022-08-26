import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { EventResult, InHouseEventType, UserRole } from '~/enum'
import { InHouseEvent, Sport, User, InHouseMatch, InHouseEventResult, InHouseTeam } from '~/types'

export const state = () => ({
  inHouseEvent: {} as InHouseEvent,
  matches: {} as InHouseMatch[],
  lead: {} as User,
  sport: {} as Sport,
  result: {} as InHouseEventResult,
  teamSheet: [],
  myTeam: {} as InHouseTeam,
  opponentTeam: {} as InHouseTeam,
  teams: [] as InHouseTeam[],
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  inHouseEvent (state, item: InHouseEvent) {
    state.inHouseEvent = item
  },

  matches (state, matches: InHouseMatch[]) {
    state.matches = matches
  },

  lead (state, lead: User) {
    state.lead = lead
  },

  sport (state, sport: Sport) {
    state.sport = sport
  },

  result (state, result: InHouseEventResult) {
    state.result = result
  },

  teamSheet (state, teamSheet) {
    state.teamSheet = teamSheet
  },

  myTeam (state, myTeam: InHouseTeam) {
    state.myTeam = myTeam
  },

  opponentTeam (state, opponentTeam: InHouseTeam) {
    state.opponentTeam = opponentTeam
  },

  teams (state, teams: InHouseTeam[]) {
    state.teams = teams
  },
}

export const getters: GetterTree<RootState, RootState> = {
  inHouseEvent (state) {
    return state.inHouseEvent
  },

  matches (state) {
    return state.matches
  },

  lead (state) {
    return state.lead
  },

  sport (state) {
    return state.sport
  },

  role (_, _getters, _rootState, rootGetters) {
    return rootGetters['context/role']
  },

  result (state) {
    return state.result
  },

  hasResult (_state, getters) {
    return !!getters.result.result
  },

  isLive (_state, getters) {
    return getters.result.result === EventResult.LIVE
  },

  hasScore (_state, getters) {
    return getters.event.eventType === InHouseEventType.HOUSE_VS_HOUSE && [
      EventResult.WIN,
      EventResult.LOST,
      EventResult.DRAW,
    ].includes(getters.result.result)
  },

  isCancelled (_state, getters) {
    return getters.result.result === EventResult.CANCELLED
  },

  isPostponed (_state, getters) {
    return getters.result.result === EventResult.POSTPONED
  },

  isPendingResult (_state, getters) {
    return !getters.result.result
  },

  canAddOrEditResult (_state, getters) {
    return getters.role === UserRole.ADMIN
  },

  canManageTeamSheet (_state, getters) {
    return getters.role === UserRole.ADMIN
  },

  teamSheet (state) {
    return state.teamSheet
  },

  myTeam (state) {
    return state.myTeam
  },

  opponentTeam (state) {
    return state.myTeam
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchData ({ commit, dispatch, rootGetters }, { inHouseCompetitionId, inHouseEventId }): Promise<void> {
    const contextSchoolId = rootGetters['context/schoolId']
    const { matches, ...inHouseEvent } = await dispatch('api/inHouseEvents/get', {
      schoolId: contextSchoolId,
      inHouseCompetitionId,
      id: inHouseEventId,
    }, { root: true })

    if (inHouseEvent.eventType === InHouseEventType.HOUSE_VS_HOUSE) {
      commit('myTeam', inHouseEvent.matches[0]?.team)
      commit('opponentTeam', inHouseEvent.matches[0]?.opponentTeam)
    } else {
      dispatch('fetchTeams', inHouseEvent.schoolId)
    }

    commit('inHouseEvent', inHouseEvent)
    commit('matches', matches)

    const promises = [
      dispatch('fetchSport', inHouseEvent.sportId),
      dispatch('fetchLead', inHouseEvent.leadId),
    ]

    await Promise.all(promises)
  },

  async fetchSport ({ dispatch, commit }, sportId: string) {
    const sport = await dispatch('api/sports/fetch', sportId, { root: true })
    commit('sport', sport)
  },

  async fetchLead ({ dispatch, commit, rootGetters }, leadId: string) {
    const contextSchoolId = rootGetters['context/schoolId']

    const lead = await dispatch('api/users/fetch', {
      schoolId: contextSchoolId,
      id: leadId,
    }, { root: true })

    commit('lead', lead)
  },

  async fetchTeams ({ dispatch, commit }, schoolId: string) {
    const teams = await dispatch('api/inHouseTeams/list', schoolId, { root: true })
    commit('teams', teams)
  },
}

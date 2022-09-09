import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { EventResult, InHouseEventType, UserRole } from '~/enum'
import { InHouseEvent, Sport, User, InHouseMatch, InHouseEventResult, InHouseTeam, InHouseCompetition, InHouseTeamSheet } from '~/types'

type ResultData = {
  overallResult?: EventResult,
  results: Array<InHouseEventResult>,
  resultNotes: string,
}

export const state = () => ({
  inHouseEvent: {} as InHouseEvent,
  firstMatch: {} as InHouseMatch,
  lead: {} as User,
  sport: {} as Sport,
  result: {
    results: [] as Array<InHouseEventResult>,
  } as ResultData,
  teamSheets: [] as Array<InHouseTeamSheet>,
  myTeam: {} as InHouseTeam,
  opponentTeam: {} as InHouseTeam,
  teams: [] as InHouseTeam[],
  matches: [] as InHouseMatch[],
  inHouseCompetition: {} as InHouseCompetition,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  inHouseEvent (state, item: InHouseEvent) {
    state.inHouseEvent = item
  },

  inHouseCompetition (state, item: InHouseCompetition) {
    state.inHouseCompetition = item
  },

  firstMatch (state, firstMatch: InHouseMatch) {
    state.firstMatch = firstMatch
  },

  lead (state, lead: User) {
    state.lead = lead
  },

  sport (state, sport: Sport) {
    state.sport = sport
  },

  result (state, result: ResultData) {
    state.result = result
  },

  teamSheets (state, teamSheets) {
    state.teamSheets = teamSheets
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

  matches (state, matches: InHouseMatch[]) {
    state.matches = matches
  },
}

export const getters: GetterTree<RootState, RootState> = {
  inHouseEvent (state) {
    return state.inHouseEvent
  },

  inHouseCompetition (state) {
    return state.inHouseCompetition
  },

  firstMatch (state) {
    return state.firstMatch
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
    return !!getters.result
  },

  isLive (_state, getters) {
    return getters.result.overallResult === EventResult.LIVE
  },

  hasScore (_state, getters) {
    return getters.inHouseEvent.eventType === InHouseEventType.HOUSE_VS_HOUSE && [
      EventResult.WIN,
      EventResult.LOST,
      EventResult.DRAW,
    ].includes(getters.results.results)
  },

  isCancelled (_state, getters) {
    return getters.results.overallResult === EventResult.CANCELLED
  },

  isPostponed (_state, getters) {
    return getters.result.overallResult === EventResult.POSTPONED
  },

  canAddOrEditResult (_state, getters) {
    return getters.role === UserRole.ADMIN
  },

  canManageTeamSheet (_state, getters) {
    return getters.role === UserRole.ADMIN
  },

  teamSheets (state) {
    return state.teamSheets
  },

  getTeamSheetByTeamId (state) {
    return (teamId: string) => {
      return state.teamSheets.find(sheet => sheet.inHouseTeamId === teamId)?.students || []
    }
  },

  myTeam (state) {
    return state.myTeam
  },

  opponentTeam (state) {
    return state.myTeam
  },

  teams (state) {
    return state.teams
  },

  matches (state) {
    return state.matches
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
      commit('myTeam', matches[0]?.team)
      commit('opponentTeam', matches[0]?.opponentTeam)
      commit('teams', [matches[0]?.team, matches[0]?.opponentTeam])
    } else {
      dispatch('fetchTeams', inHouseEvent.schoolId)
    }

    commit('inHouseEvent', inHouseEvent)
    commit('inHouseCompetition', inHouseEvent.inHouseCompetition)
    commit('firstMatch', matches[0])
    commit('matches', matches)

    commit('result', {
      overallResult: inHouseEvent.overallResult,
      results: inHouseEvent.results,
      resultNotes: inHouseEvent.resultNotes,
    })

    const promises = [
      dispatch('fetchSport', inHouseEvent.inHouseCompetition.sportId),
      dispatch('fetchLead', inHouseEvent.leadId),
      dispatch('fetchTeamSheets', { inHouseCompetitionId: inHouseEvent.inHouseCompetitionId, eventId: inHouseEvent.id }),
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

  async fetchTeamSheets ({ dispatch, commit, rootGetters }, { inHouseCompetitionId, eventId }) {
    const contextSchoolId = rootGetters['context/schoolId']

    const teamSheets = await dispatch('api/inHouseEvents/getTeamSheet', {
      schoolId: contextSchoolId,
      inHouseCompetitionId,
      id: eventId,
    }, { root: true })

    commit('teamSheets', teamSheets)
  },

  async fetchTeams ({ dispatch, commit }, schoolId: string) {
    const teams = await dispatch('api/inHouseTeams/list', { schoolId }, { root: true })
    commit('teams', teams)
  },

  async saveResult ({ commit, dispatch, rootGetters, getters }, payload) {
    const contextSchoolId = rootGetters['context/schoolId']

    const data = await dispatch('api/inHouseEvents/storeResult', {
      schoolId: contextSchoolId,
      inHouseCompetition: getters.inHouseCompetition.id,
      id: getters.inHouseEvent.id,
      formData: payload,
    }, { root: true })

    commit('result', {
      overallResult: data.overallResult,
      results: data.results,
      resultNotes: data.resultNotes,
    })
  },
}

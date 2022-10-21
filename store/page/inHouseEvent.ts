import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { InHouseEventResult, InHouseEventType, UserRole } from '~/enum'
import { InHouseEvent, Sport, User, InHouseMatch, InHouseTeam, InHouseCompetition, InHouseTeamSheet } from '~/types'

type ResultData = {
  homeScore: string,
  awayScore: string,
  overallResult?: InHouseEventResult,
  resultNotes: string,
  winnerId: string,
}

export const state = () => ({
  inHouseEvent: {} as InHouseEvent,
  inHouseMatch: {} as InHouseMatch,
  firstMatch: {} as InHouseMatch,
  lead: {} as User,
  sport: {} as Sport,
  result: {} as ResultData,
  teamSheets: [] as Array<InHouseTeamSheet>,
  myTeam: {} as InHouseTeam,
  opponentTeam: {} as InHouseTeam,
  teams: [] as InHouseTeam[],
  matches: [] as InHouseMatch[],
  inHouseCompetition: {} as InHouseCompetition,
  winner: {} as InHouseTeam,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  inHouseEvent (state, item: InHouseEvent) {
    state.inHouseEvent = item
  },

  inHouseMatch (state, item: InHouseMatch) {
    state.inHouseMatch = item
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

  winner (state, winner: InHouseTeam) {
    state.winner = winner
  },
}

export const getters: GetterTree<RootState, RootState> = {
  inHouseEvent (state) {
    return state.inHouseEvent
  },

  inHouseMatch (state) {
    return state.inHouseMatch
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
    return !!getters.result.overallResult
  },

  hasScore (_state, getters) {
    return getters.inHouseEvent.eventType === InHouseEventType.HOUSE_VS_HOUSE && [
      InHouseEventResult.HOME,
      InHouseEventResult.AWAY,
      InHouseEventResult.DRAW,
    ].includes(getters.result.overallResult)
  },

  canAddOrEditResult (_state, getters) {
    return [UserRole.ADMIN, UserRole.SUPER_ADMIN].includes(getters.role)
  },

  canManageTeamSheet (_state, getters) {
    return [UserRole.ADMIN, UserRole.SUPER_ADMIN].includes(getters.role)
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
    return state.opponentTeam
  },

  teams (state) {
    return state.teams
  },

  matches (state) {
    return state.matches
  },

  winner (state) {
    return state.winner
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchData ({ commit, dispatch, rootGetters }, { inHouseCompetitionId, inHouseMatchId }): Promise<void> {
    const contextSchoolId = rootGetters['context/schoolId']
    const match = await dispatch('api/inHouseMatches/get', {
      schoolId: contextSchoolId,
      inHouseCompetitionId,
      id: inHouseMatchId,
    }, { root: true })

    const inHouseEvent = await dispatch('api/inHouseEvents/get', {
      schoolId: contextSchoolId,
      inHouseCompetitionId,
      id: match.inHouseEventId,
    }, { root: true })

    if (inHouseEvent.eventType === InHouseEventType.HOUSE_VS_HOUSE) {
      commit('myTeam', match.homeTeam)
      commit('opponentTeam', match?.awayTeam)
      commit('teams', [match?.homeTeam, match?.awayTeam])
    } else {
      const teams = await dispatch('fetchTeams', inHouseEvent.schoolId)
      if (match.winnerId) {
        const winner = teams.find((team: InHouseTeam) => team.id === match.winnerId)
        commit('winner', winner)
      }
    }

    commit('inHouseMatch', match)
    commit('inHouseEvent', inHouseEvent)
    commit('inHouseCompetition', inHouseEvent.inHouseCompetition)

    commit('result', {
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      overallResult: match.overallResult,
      resultNotes: match.resultNotes,
      winnerId: match.winnerId,
    })

    const promises = [
      dispatch('fetchSport', inHouseEvent.inHouseCompetition.sportId),
      dispatch('fetchLead', inHouseEvent.leadId),
      dispatch('fetchTeamSheets', { inHouseCompetitionId: inHouseEvent.inHouseCompetitionId, matchId: match.id }),
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

  async fetchTeamSheets ({ dispatch, commit, rootGetters }, { inHouseCompetitionId, matchId }) {
    const contextSchoolId = rootGetters['context/schoolId']

    const teamSheets = await dispatch('api/inHouseEvents/getTeamSheet', {
      schoolId: contextSchoolId,
      inHouseCompetitionId,
      id: matchId,
    }, { root: true })

    commit('teamSheets', teamSheets)
  },

  async fetchTeams ({ dispatch, commit }, schoolId: string) {
    const teams = await dispatch('api/inHouseTeams/list', { schoolId }, { root: true })
    commit('teams', teams)
    return teams
  },

  async saveResult ({ commit, dispatch, rootGetters, getters }, payload) {
    const contextSchoolId = rootGetters['context/schoolId']

    const data = await dispatch('api/inHouseMatches/storeResult', {
      schoolId: contextSchoolId,
      inHouseCompetitionId: getters.inHouseCompetition.id,
      id: getters.inHouseMatch.id,
      formData: payload,
    }, { root: true })

    if (data.winnerId) {
      const winner = getters.teams.find((team: InHouseTeam) => team.id === data.winnerId)
      commit('winner', winner)
    }

    commit('result', {
      homeScore: data.homeScore,
      awayScore: data.awayScore,
      overallResult: data.overallResult,
      resultNotes: data.resultNotes,
      winnerId: data.winnerId,
    })
  },

  async updateMatch ({ commit, dispatch, rootGetters, getters }, payload) {
    const contextSchoolId = rootGetters['context/schoolId']

    const data = await dispatch('api/inHouseMatches/updateMatch', {
      schoolId: contextSchoolId,
      inHouseCompetitionId: getters.inHouseCompetition.id,
      id: getters.inHouseMatch.id,
      formData: payload,
    }, { root: true })

    commit('inHouseMatch', data)
    commit('inHouseEvent', {
      ...getters.inHouseEvent,
      ...(payload.info && { info: payload.info }),
    })
    if (payload.leadId) {
      await dispatch('fetchLead', payload.leadId)
    }
  },
}

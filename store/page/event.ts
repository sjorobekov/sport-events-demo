import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Event, EventParticipant, EventParticipantResult, School, Sport, Team, User } from '~/types'
import { EventResult, EventType, UserRole } from '~/enum'

type ResultData = {
  overallResult?: EventResult,
  results: Array<EventParticipantResult>,
  resultNotes: string,
}

export const state = () => ({
  event: {} as Event,
  me: {} as EventParticipant,
  myTeam: {} as Team,
  opponent: {} as EventParticipant,
  opponentTeam: {} as School,
  lead: {} as User,
  sport: {} as Sport,
  result: {
    results: [] as Array<EventParticipantResult>,
  } as ResultData,
  teamSheet: [],
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  event (state, item: Event) {
    state.event = item
  },

  me (state, me: EventParticipant) {
    state.me = me
  },

  myTeam (state, myTeam: Team) {
    state.myTeam = myTeam
  },

  opponent (state, opponent: EventParticipant) {
    state.opponent = opponent
  },

  opponentTeam (state, school: School) {
    state.opponentTeam = school
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

  teamSheet (state, teamSheet) {
    state.teamSheet = teamSheet
  },
}

export const getters: GetterTree<RootState, RootState> = {
  event (state) {
    return state.event
  },

  me (state) {
    return state.me
  },

  myTeam (state) {
    return state.myTeam
  },

  opponent (state) {
    return state.opponent
  },

  opponentTeam (state) {
    return state.opponentTeam
  },

  lead (state) {
    return state.lead
  },

  sport (state) {
    return state.sport
  },

  result (state) {
    return state.result
  },

  hasResult (_state, getters) {
    return !!getters.result.overallResult
  },

  isLive (_state, getters) {
    return getters.result.overallResult === EventResult.LIVE
  },

  hasScore (_state, getters) {
    return getters.event.eventType === EventType.FIXTURE && [
      EventResult.WIN,
      EventResult.LOST,
      EventResult.DRAW,
    ].includes(getters.result.overallResult)
  },

  isCancelled (_state, getters) {
    return getters.result.overallResult === EventResult.CANCELLED
  },

  isPostponed (_state, getters) {
    return getters.result.overallResult === EventResult.POSTPONED
  },

  isPendingResult (_state, getters) {
    return !getters.result.overallResult
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

  role (_, _getters, _rootState, rootGetters) {
    return rootGetters['context/role']
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchData ({ commit, dispatch, rootGetters }, eventId: string): Promise<void> {
    const contextSchoolId = rootGetters['context/schoolId']
    const { me, opponent, ...event } = await dispatch('api/events/get', {
      schoolId: contextSchoolId,
      id: eventId,
    }, { root: true })

    commit('event', event)
    commit('me', me)
    commit('opponent', opponent)

    commit('result', {
      overallResult: me.overallResult,
      results: me.results,
      resultNotes: me.resultNotes,
    })

    const promises = [
      dispatch('fetchMyTeam', me.teamId),
      dispatch('fetchSport', event.sportId),
      dispatch('fetchLead', me.leadId),
    ]

    if (opponent) {
      promises.push(dispatch('fetchOpponentTeam', {
        listedAsOpponentId: opponent.listedAsOpponentId,
        schoolId: opponent.schoolId,
      }))
    }

    promises.push(dispatch('fetchTeamSheet', eventId))

    await Promise.all(promises)
  },

  async fetchMyTeam ({ commit, dispatch, rootGetters }, teamId: string) {
    const contextSchoolId = rootGetters['context/schoolId']

    const myTeam = await dispatch('api/teams/fetch', {
      schoolId: contextSchoolId,
      id: teamId,
    }, { root: true })

    commit('myTeam', myTeam)
  },

  async fetchOpponentTeam ({ commit, dispatch, rootGetters }, { listedAsOpponentId, schoolId }: { listedAsOpponentId?: string, schoolId?: string }) {
    const contextSchoolId = rootGetters['context/schoolId']

    if (schoolId) {
      const school = await dispatch('api/schools/fetch', schoolId, { root: true })
      commit('opponentTeam', school)
    } else if (listedAsOpponentId) {
      const opponent = await dispatch('api/opponents/fetch', {
        schoolId: contextSchoolId,
        id: listedAsOpponentId,
      }, { root: true })
      commit('opponentTeam', opponent)
    } else {
      throw new Error('Logic Error')
    }
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

  async fetchTeamSheet ({ dispatch, commit, rootGetters }, eventId: string) {
    const contextSchoolId = rootGetters['context/schoolId']

    const teamSheet = await dispatch('api/events/getTeamSheet', {
      schoolId: contextSchoolId,
      id: eventId,
    }, { root: true })

    commit('teamSheet', teamSheet)
  },

  async saveResult ({ commit, dispatch, rootGetters, getters }, payload) {
    const contextSchoolId = rootGetters['context/schoolId']

    const { me } = await dispatch('api/events/storeResult', {
      schoolId: contextSchoolId,
      id: getters.event.id,
      formData: payload,
    }, { root: true })

    commit('result', {
      overallResult: me.overallResult,
      results: me.results,
      resultNotes: me.resultNotes,
    })
  },
}

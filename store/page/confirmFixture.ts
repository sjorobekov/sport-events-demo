import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Event, EventParticipant, EventParticipantResult } from '~/types'
import { EventResult, EventType, UserRole } from '~/enum'
import { EventUpdatePayload } from '~/store/api/events'

type ResultData = {
  overallResult?: EventResult,
  results: Array<EventParticipantResult>,
  resultNotes: string,
}

export const state = () => ({
  event: {} as Event,
  me: {} as EventParticipant,
  opponent: {} as EventParticipant,
  result: {
    results: [] as Array<EventParticipantResult>,
  } as ResultData,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  event (state, item: Event) {
    state.event = item
  },

  me (state, me: EventParticipant) {
    state.me = me
  },

  opponent (state, opponent: EventParticipant) {
    state.opponent = opponent
  },

  result (state, result: ResultData) {
    state.result = result
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
    return state.me.team
  },

  opponent (state) {
    return state.opponent
  },

  opponentTeam (state) {
    if (state.opponent) {
      return state.opponent.school || state.opponent.opponent
    }
    return null
  },

  lead (state) {
    return state.me.lead
  },

  sport (state) {
    return state.event.sport
  },

  sportLocation (state) {
    return state.event.sportLocation
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
    return getters.result.overallResult === EventResult.TO_BE_PLAYED
  },

  canAddOrEditResult (_state, getters) {
    return [UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.SPORTS_USER].includes(getters.role)
  },

  canHaveResult (_state, getters, _rootState, rootGetters) {
    return rootGetters['api/events/eventTypesCanHaveResults'].includes(getters.event.eventType)
  },

  canManageTeamSheet (_state, getters) {
    return [UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.SPORTS_USER].includes(getters.role)
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

  async update ({ commit, dispatch, rootGetters, getters }, payload: EventUpdatePayload) {
    const contextSchoolId = rootGetters['context/schoolId']

    const { me, opponent, ...event } = await dispatch('api/events/update', {
      schoolId: contextSchoolId,
      id: getters.event.id,
      data: payload,
    }, { root: true })

    commit('event', event)
    commit('me', me)
    commit('opponent', opponent)
  },
}

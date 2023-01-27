import { ActionTree } from 'vuex'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

type CheckIfLeadIsAvailablePayload = {
  date: string,
  fromTime: string,
  toTime: string,
  leadId: string,
}

type CheckIfSportLocationIsAvailablePayload = {
  date: string,
  fromTime: string,
  toTime: string,
  sportLocationId: string,
}

type AvailabilityResponse = {
  available: boolean,
}

export const actions: ActionTree<RootState, RootState> = {

  checkIfLeadIsAvailable ({ rootGetters }, payload: CheckIfLeadIsAvailablePayload): Promise<AvailabilityResponse> {
    return this.$axios.$post(`/api/v1/schools/${rootGetters['context/schoolId']}/validation/check_lead_is_available`, payload)
  },

  checkIfSportLocationIsAvailable ({ rootGetters }, payload: CheckIfSportLocationIsAvailablePayload) {
    return this.$axios.$post(`/api/v1/schools/${rootGetters['context/schoolId']}/validation/check_sport_location_is_available`, payload)
  },
}

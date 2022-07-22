import {
  EventType,
  TransportType,
  EventLocationType,
  EventLocation,
  SeasonStatus,
  RepeatPeriod,
  FixtureType,
  Gender, UserRole, EventStatus, EventResult,
} from '@/enum'

export type Plan = {
  readonly id: string,
  name: string,
}

export interface School {
  readonly id: string
  name: string
  street?: string
  country?: string
  city?: string
  state?: string
  zip?: string
  readonly usersCount?: number
  portal?: boolean
  portalAddress?: string
  readonly lastActive?: string
  website?: string
  planId?: string
  plan?: Plan
  logo?: string
  portalProtected?: boolean
  teamSheetsProtected?: boolean
  announcementsProtected?: boolean
  email?: string
  password?: string
}

export type Sport = {
  readonly id: string,
  name: string,
  color: string,
  readonly icon: string,
  file?: File,
}

export type User = {
  readonly id: string,
  email: string,
  firstname: string,
  lastname: string,
  displayName: string,
  phone: string,
  jobRole: string,
  userRole: UserRole,
  enabled: boolean,
  displaySportsContact: boolean,
  mainSportsContact: boolean,
  readonly lastActive: string,
  schoolId: string,
  readonly createdAt: string,
  readonly updatedAt: string,
}

export interface InHouseTeam {
  readonly id: string
  name: string
  schoolId: string
  color: string
  readonly createdAt: string
  readonly updatedAt: string
}

export type Student = {
  readonly id: string,
  firstname: string,
  lastname: string,
  birthday: string,
  yearGroup: number,
  gender: string,
  inHouseTeamId: string,
  readonly inHouseTeam?: InHouseTeam,
  schoolId: string,
  readonly createdAt: string,
  readonly updatedAt: string,
}

export interface Team {
  readonly id: string,
  sportId: string,
  readonly sport: Sport,
  seasonId: string,
  gender: Gender,
  age: string,
  ability: string,
  name: string,
  coachId: string,
  readonly coach: User,
  schoolId: string,
  publishTeam: boolean,
  publishResults: string,
  file?: File,
  photo?: string,
  readonly createdAt: string,
  readonly updatedAt: string,
}

export interface Location {
  readonly id: string
  name: string
  address: string
  schoolId: string
  coordinates: {
    lng: number,
    lat: number,
  },
  readonly createdAt: string
  readonly updatedAt: string
}

export interface Season {
  readonly id: string
  readonly start: string
  readonly end: string
  readonly status: SeasonStatus
  readonly createdAt: string
  readonly updatedAt: string
}

export interface Opponent {
  readonly id: string
  name: string
  address: string
  schoolId: string
  opponentSchoolId: string
  opponentSchool: School
  readonly createdAt: string
  readonly updatedAt: string
}

export interface EventParticipantResult {
  score: number
  result: EventResult
  opponentScore: number
  opponentSchool: string
}

export interface EventParticipant {
  readonly id: string
  gender: Gender
  age: string
  ability: string
  schoolId: string
  teamId?: string
  readonly team?: Team,
  listedAsOpponentId?: string
  noNeedTransport?: boolean
  transportTo?: TransportType
  transportToOther?: string
  transportFrom?: TransportType
  transportFromOther?: string
  info?: string
  meetTime?: string
  returnTime?: string
  finishTime?: string
  status: EventStatus
  eventLocation: EventLocation
  creator: boolean
  overallResult: EventResult,
  results?: Array<EventParticipantResult>
}

export interface Event {
  readonly id: string
  name: string
  eventType: EventType
  sportId: string
  readonly sport?: Sport
  fixtureType: FixtureType
  date: string
  startTime: string
  repeats?: boolean
  repeatPeriod?: RepeatPeriod
  repeatDays?: string[]
  startDate?: string
  endDate?: string
  location: EventLocationType
  sportLocationId?: string
  readonly sportLocation?: Location
  otherLocation?: string
  me?: EventParticipant
  opponent?: EventParticipant
  readonly createdAt?: string
  readonly updatedAt?: string
  readonly participants: [EventParticipant, EventParticipant?]
}

export interface CreateEventPayload {
  event: Event
  opponent: EventParticipant
  me: EventParticipant
  schoolId: string
}

export interface CreateEventBatchPayload {
  events: Array<{
    event: Event
    opponent: EventParticipant
    me: EventParticipant
  }>
  schoolId: string
}

export type Dictionary<T> = { [key: string]: T }

export type Primitive = number|string|boolean

export interface PaginatedList <T> {
  readonly data: Array<T>
  readonly meta: {
    lastPage: number|string,
    total: number,
  }
}

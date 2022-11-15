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
  color?: string
  emailDomains?: Array<string>,
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

export type Announcement = {
  readonly id: string,
  subject: string,
  body: string,
  userId: string,
  schoolId: string,
  readonly user: User,
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
  played: number,
  won: number,
  drawn: number,
  lost: number,
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
  coordinates: {
    lng: number,
    lat: number,
  },
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
  opponentSchoolId?: string
  opponentId?: string
  round?: string
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
  readonly opponent?: Opponent
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
  leadId?: string,
  readonly school?: School
  readonly lead?: User
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

export interface InHouseCompetition {
  readonly id: string
  schoolId: string
  readonly school?: School
  sportId: string
  readonly sport?: Sport
  seasonId: string
  readonly season: Season
  name: string
  leadId: string
  readonly lead: User
  file?: File,
  photo?: string,
  publishCompetition: boolean
  publishResults: string
  readonly createdAt: string
  readonly updatedAt: string
}

export interface InHouseEventResult {
  result: EventResult
  score: string
  opponentScore: string
  notes: string
}
export interface InHouseEvent {
  readonly id: string
  eventType: string
  noNeedTransport?: boolean
  schoolId: string
  readonly school?: School
  inHouseCompetitionId: string
  readonly inHouseCompetition?: InHouseCompetition
  leadId: string
  readonly lead: User
  info: string
  results: Array<InHouseEventResult>
  publishResults: string
  readonly createdAt: string
  readonly updatedAt: string
}
export interface InHouseMatch {
  readonly id: string
  number: number
  inHouseEventId: string
  readonly inHouseEvent?: InHouseEvent
  teamId: string
  readonly team?: InHouseTeam
}

export interface InHouseTeamSheet {
  readonly id: string
  inHouseEventId: string
  readonly inHouseEvent?: InHouseEvent
  inHouseTeamId: string
  readonly inHouseTeam?: InHouseTeam
  sheet: string[]
  readonly students?: Student[]
  readonly createdAt: string
  readonly updatedAt: string
}

export interface StudentsParticipationStatistics {
  sports: number,
  events: number,
  weekStudents: number,
  monthStudents: number
}

export interface StudentsParticipation extends Student {
  events: number,
  trainings: number,
  inHouseEvents: number,
  totalEvents: number,
  sports: number,
}

export interface SportsRecordCategory {
  readonly id: string
  name: string
  schoolId: string
  readonly createdAt: string
  readonly updatedAt: string
}

export interface SportsRecordEvent {
  readonly id: string
  name: string
  schoolId: string
  sportId: string
  readonly sport: Sport
  readonly createdAt: string
  readonly updatedAt: string
}

export interface SportsRecord {
  readonly id: string
  name: string
  schoolId: string
  readonly school?: School
  sportId: string
  readonly sport?: Sport
  sportsRecordEventId: string
  readonly sportsRecordEvent?: SportsRecordEvent
  sportsRecordCategoryId: string
  readonly sportsRecordCategory?: SportsRecordCategory
  studentId?: string
  readonly student?: Student
  studentName?: string
  score: string
  date: string
  readonly createdAt: string
  readonly updatedAt: string
}

export interface SchoolRequest {
  readonly id: string
  name: string
  street?: string
  country?: string
  city?: string
  state?: string
  zip?: string
  website?: string
  email?: string
}

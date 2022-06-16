export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  SPORTS_USER = 'SPORTS_USER',
  VIEW_ONLY = 'VIEW_ONLY',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum PublishResult {
  RESULTS_SCORES = 'RESULTS_SCORES',
  RESULTS = 'RESULTS',
  EVENTS = 'EVENTS',
}

export enum SeasonStatus {
  CURRENT = 'CURRENT',
  UPCOMING = 'UPCOMING',
  PAST = 'PAST',
}

export enum EventType {
  FIXTURE = 'FIXTURE',
  TOURNAMENT = 'TOURNAMENT',
  MULTI_EVENT = 'MULTI_EVENT',
  TRAINING = 'TRAINING',
}

export enum TransportType {
  VENUE = 'VENUE',
  BUS = 'BUS',
  OTHER = 'OTHER',
}

export enum FixtureType {
  FRIENDLY = 'FRIENDLY',
  ON_TOUR = 'ON_TOUR',
  PRE_SEASON = 'PRE_SEASON',
  LEAGUE = 'LEAGUE',
  CUP = 'CUP',
}

export enum EventLocationType {
  SPORTS_LOCATIONS = 'SPORTS_LOCATIONS',
  OPPONENT_CONFIRMS = 'OPPONENT_CONFIRMS',
  OTHER = 'OTHER',
}

export enum EventLocation {
  HOME = 'HOME',
  NEUTRAL = 'NEUTRAL',
  AWAY = 'AWAY',
}

export enum RepeatPeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  WEEKDAYS = 'WEEKDAYS',
}

export enum EventStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
}

import {
  EventLocation,
  EventLocationType,
  EventResult,
  EventType,
  FixtureType,
  TransportType,
  InHouseEventResult,
  UserRole, InHouseEventType, TariffPlanPeriod,
} from '~/enum'

export default {
  EVENT_TYPE: {
    [EventType.FIXTURE]: 'Fixture',
    [EventType.TOURNAMENT]: 'Tournament',
    [EventType.MULTI_EVENT]: 'Multi-Events',
    [EventType.TRAINING]: 'Training',
  },
  EVENT_LOCATION: {
    [EventLocation.HOME]: 'Home',
    [EventLocation.AWAY]: 'Away',
    [EventLocation.NEUTRAL]: 'Neutral',
  },
  EVENT_LOCATION_TYPE: {
    [EventLocationType.SPORTS_LOCATIONS]: 'Sports Location',
    [EventLocationType.OPPONENT_CONFIRMS]: 'Opponent Confirms',
    [EventLocationType.OTHER]: 'Other',
  },
  FIXTURE_TYPE: {
    [FixtureType.CUP]: 'Cup',
    [FixtureType.LEAGUE]: 'League',
    [FixtureType.FRIENDLY]: 'Friendly',
    [FixtureType.ON_TOUR]: 'On Tour',
    [FixtureType.PRE_SEASON]: 'Pre-Season',
  },
  EVENT_RESULT: {
    [EventResult.WIN]: 'Won',
    [EventResult.DRAW]: 'Draw',
    [EventResult.LOST]: 'Lost',
    [EventResult.LIVE]: 'Live',
    [EventResult.SEE_MATCH_NOTES]: 'See Match Notes',
    [EventResult.TO_BE_PLAYED]: 'To Be Played',
    [EventResult.SEE_EVENT_RESULTS]: 'See Event Results',
    [EventResult.POSTPONED]: 'Postponed',
    [EventResult.CANCELLED]: 'Cancelled',
    [EventResult.ABANDONED]: 'Abandoned',
    [EventResult.WALK_OVER]: 'Walk Over',
    [EventResult.WITHDRAW]: 'Withdrawn',
    [EventResult.DISPUTED]: 'Disputed',
    [EventResult['1ST']]: '1st',
    [EventResult['2ND']]: '2nd',
    [EventResult['3RD']]: '3rd',
    [EventResult['4TH']]: '4th',
  },

  IN_HOUSE_EVENT_RESULT: {
    [InHouseEventResult.HOME]: 'Home Won',
    [InHouseEventResult.DRAW]: 'Draw',
    [InHouseEventResult.AWAY]: 'Away Won',
    [InHouseEventResult.SEE_MATCH_NOTES]: 'See Match Notes',
    [InHouseEventResult.TO_BE_PLAYED]: 'To Be Played',
    [InHouseEventResult.POSTPONED]: 'Postponed',
    [InHouseEventResult.CANCELLED]: 'Cancelled',
    [InHouseEventResult.TO_BE_PLAYED]: 'To Be Played',
  },

  IN_HOUSE_EVENT_TYPE: {
    [InHouseEventType.HOUSE_VS_HOUSE]: 'House vs. House',
    [InHouseEventType.ALL_HOUSES]: 'All Houses',
  },

  TRANSPORT_TO: {
    [TransportType.BUS]: 'Bus',
    [TransportType.VENUE]: 'Meet at Venue',
    [TransportType.OTHER]: 'Other',
  },

  TRANSPORT_FROM: {
    [TransportType.BUS]: 'Bus',
    [TransportType.VENUE]: 'Collect from Venue',
    [TransportType.OTHER]: 'Other',
  },

  USER_ROLE: {
    [UserRole.ADMIN]: 'Admin',
    [UserRole.SPORTS_USER]: 'Team Member',
    [UserRole.VIEW_ONLY]: 'View Only',
  },

  TariffPlanPeriod: {
    [TariffPlanPeriod.YEAR]: 'Yearly',
    [TariffPlanPeriod.MONTH]: 'Monthly',
  },

  page: {
    FxTeamSheetEditPage: {
      STUDENTS_SELECTED: 'No Students Selected | One Student Selected | {count} Students Selected',
    },
    InHouse: {
      COMPETITIONS: 'No Competitions | 1 Competition | {count} Competitions',
    },
    MissingResults: {
      MISSING_RESULTS: 'No Missing Results | 1 Missing Result | {count} Missing Results',
    },
    Dashboard: {
      FIXTURES_TO_CONFIRM: 'No Fixtures | 1 Fixture | {count} Fixtures',
      TEAMS_TODAY: 'No Teams | 1 Team | {count} Teams',
      STUDENTS: 'No Students | 1 Student | {count} Students',
    },
    Participation: {
      EVENTS: 'No Events | 1 Event | {count} Events',
      SPORTS: 'No Sports | 1 Sport | {count} Sports',
    },
    FxEventForm: {
      OCCURRENCES: 'No occurrences of this event | 1 occurrence of this event | {count} occurrences of this event',
    },
  },
}

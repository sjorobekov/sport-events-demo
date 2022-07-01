import { EventResult, TransportType } from '~/enum'

export default {
  EVENT_RESULT: {
    [EventResult.WIN]: 'Won',
    [EventResult.DRAW]: 'Draw',
    [EventResult.LOST]: 'Lost',
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
}

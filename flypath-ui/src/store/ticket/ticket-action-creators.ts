import { Error } from '@types-internal/rest-service/response.type'
import { Ticket } from '@types-internal/ticket/ticket.type'

import { ticketActions } from '@enums/store/ticket-actions.enum'
import { TemporaryChosenDestination } from '@types-internal/store/user/user-initial-state'

export const ticketActionCreators = {
  toggleLoading: (isLoading: boolean) =>
    ({
      type: ticketActions.TOGGLE_LOADING,
      payload: isLoading
    } as const),
  catchError: (error: Error) =>
    ({
      type: ticketActions.CATCH_ERROR,
      payload: error
    } as const),
  getTicketById: (foundedTicket: Ticket) =>
    ({
      type: ticketActions.GET_TICKET_BY_ID,
      payload: { foundedTicket }
    } as const),
  setTicketList: (ticketList: Array<Ticket>) =>
    ({
      type: ticketActions.SET_TICKET_LIST,
      payload: { ticketList }
    } as const),
  // sagas
  loadTicketList: () =>
    ({
      type: ticketActions.LOAD_TICKET_LIST,
      payload: null
    } as const),
  createTickets: (formedTickets: TemporaryChosenDestination | null) =>
    ({
      type: ticketActions.CREATE_TICKETS,
      payload: { formedTickets }
    } as const)
}

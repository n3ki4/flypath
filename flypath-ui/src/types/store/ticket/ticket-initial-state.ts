import { Ticket } from '@types-internal/ticket/ticket.type'

export type TicketInitialState = {
  isLoading: boolean
  errorMessage: null | string
  ticketList: Array<Ticket> | null
  choosedTicket: null | Ticket
}

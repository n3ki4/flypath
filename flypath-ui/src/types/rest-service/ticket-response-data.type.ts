import { Ticket } from '@types-internal/ticket/ticket.type'

export interface TicketResponseDataType {
  count: number
  rows: Ticket[]
}

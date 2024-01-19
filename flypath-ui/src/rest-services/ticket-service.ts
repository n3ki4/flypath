import { httpClient } from '@rest-services/axios/axios-instance'

import { Success } from '@types-internal/rest-service/response.type'
import { TicketResponseDataType } from '@types-internal/rest-service/ticket-response-data.type'
import { TicketCreatedByUser } from '@types-internal/ticket/tickets-create-by-user.type'

export const ticketAPI = {
  getTicketList: (): Promise<Error | Success<TicketResponseDataType>> => httpClient.get('private/ticket/list'),
  getTicketById: (id: string): Promise<Error | Success<TicketResponseDataType>> => httpClient.get(`private/ticket/item/${id}`),
  postTicket: (formedTicket: TicketCreatedByUser): Promise<Error | Success<TicketResponseDataType>> => httpClient.post('private/ticket/item', formedTicket),
  getUserTicketsList: (): Promise<Error | Success<TicketResponseDataType>> => httpClient.get('private/ticket/list')
}

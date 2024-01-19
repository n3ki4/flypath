import { getTicketInfo } from "@controllers/ticket/get-ticket";
import { getTicketsList } from "@controllers/ticket/get-tickets-list";
import { makeTickets } from "@controllers/ticket/add-ticket";

export const ticketController = {
  getTicketInfo,
  makeTickets,
  getTicketsList,
};

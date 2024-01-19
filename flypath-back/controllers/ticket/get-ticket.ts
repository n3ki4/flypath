import { RESPONSE_CODES } from "message-catcher";
import { NextFunction } from "express";

import { responseCatcher } from "@helpers/response-catcher";
import { errorCatcher } from "@helpers/error-catcher";

import { getTicket } from "@services/ticket/get-ticket";

import { TicketAttributes } from "@types-internal/ticket/ticket-attributes";

export const getTicketInfo = async (id: string, next: NextFunction) => {
  try {
    const ticketInfo = await getTicket(id);

    if (!ticketInfo) {
      errorCatcher({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        message: "Ticket is not founded",
      });
      return;
    }

    next(
      responseCatcher<TicketAttributes>({
        responseCode: RESPONSE_CODES.SUCCESS,
        data: {
          data: ticketInfo,
          message: "Ticket info",
        },
      })
    );
  } catch (error) {
    console.log("CONTROLLER_ERROR", error);
    next(error);
  }
};

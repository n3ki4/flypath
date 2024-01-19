import { RESPONSE_CODES } from "message-catcher";
import { NextFunction } from "express";

import { responseCatcher } from "@helpers/response-catcher";
import { getTickets } from "@services/ticket/get-tickets";
import { TicketAttributes } from "@types-internal/ticket/ticket-attributes";

export const getTicketsList = async (userId: string, next: NextFunction) => {
  try {
    const destinationList = await getTickets(userId);

    next(
      responseCatcher<{
        rows: TicketAttributes[];
        count?: number;
      }>({
        responseCode: RESPONSE_CODES.SUCCESS,
        data: {
          data: destinationList,
          message: "Your tickets",
        },
      })
    );
  } catch (error) {
    console.log("CONTROLLER_ERROR", error);
    next(error);
  }
};

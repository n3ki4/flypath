import { RESPONSE_CODES } from "message-catcher";
import { NextFunction } from "express";

import { responseCatcher } from "@helpers/response-catcher";
import { errorCatcher } from "@helpers/error-catcher";
import { createCheckout } from "@services/ticket/create-ticket";
import { Checkout } from "@types-internal/ticket/checkout-type";
import { updateDestinationSeats } from "@services/destination/update-destination";

export const makeTickets = async (
  checkout: Checkout,
  userId: string,
  next: NextFunction
) => {
  try {
    const areTicketsCreated = await createCheckout(checkout, userId);

    if (!areTicketsCreated) {
      errorCatcher({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        message: "Ticket are not created",
      });
      return;
    }

    const isDestinationUpdate = await updateDestinationSeats(
      checkout.destinationId,
      checkout.seats.map((item) => item.seatCode)
    );

    if (!isDestinationUpdate) {
      errorCatcher({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        message: "Destination is not updated",
      });
      return;
    }

    next(
      responseCatcher({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: [],
          message: "Tickets are created successfully",
        },
      })
    );
  } catch (error) {
    console.log("CONTROLLER_ERROR", error);
    next(error);
  }
};

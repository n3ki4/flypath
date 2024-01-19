import { RESPONSE_CODES } from "message-catcher";
import { NextFunction } from "express";

import { responseCatcher } from "@helpers/response-catcher";
import { DestinationAttributes } from "@types-internal/destination/destination-attributes";
import { getDestination } from "@services/destination/get-destination";
import { errorCatcher } from "@helpers/error-catcher";

export const getDestinationInfo = async (id: string, next: NextFunction) => {
  try {
    const destinationInfo = await getDestination(id);

    if (!destinationInfo) {
      errorCatcher({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        message: "Deliverer is not founded",
      });
      return;
    }

    next(
      responseCatcher<DestinationAttributes>({
        responseCode: RESPONSE_CODES.SUCCESS,
        data: {
          data: destinationInfo,
          message: "Destination info",
        },
      })
    );
  } catch (error) {
    console.log("CONTROLLER_ERROR", error);
    next(error);
  }
};

import { RESPONSE_CODES } from "message-catcher";
import { NextFunction } from "express";

import { responseCatcher } from "@helpers/response-catcher";

import { getDestinations } from "@services/destination/get-destinations-list";

import { FilterOptionsReformated } from "@types-internal/filtration/filtration-options-reformated";
import { DestinationAttributes } from "@types-internal/destination/destination-attributes";

export const getDestinationsList = async (
  filterOptions: FilterOptionsReformated,
  next: NextFunction
) => {
  try {
    console.log(filterOptions)
    const destinationList = await getDestinations(filterOptions);
    console.log(destinationList)
    next(
      responseCatcher<{
        rows: DestinationAttributes[];
        count?: number;
      }>({
        responseCode: RESPONSE_CODES.SUCCESS,
        data: {
          data: destinationList,
          message: "Filtered destinations",
        },
      })
    );
  } catch (error) {
    console.log("CONTROLLER_ERROR", error);
    next(error);
  }
};

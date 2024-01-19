import { knexConnection } from "@services/connect-db-knex";
import { Checkout } from "@types-internal/ticket/checkout-type";
import { v4 as uuidv4 } from "uuid";

export const createCheckout = async (
  checkout: Checkout,
  userId: string
): Promise<boolean> => {
  try {
    const { destinationId, seats } = checkout;

    await Promise.all(
      seats.map((seatInfo) => {
        return knexConnection("Ticket").insert({
          ["id"]: uuidv4(),
          ["full_name"]: seatInfo.fullName,
          ["place_number"]: seatInfo.seatCode,
          ["destination_id"]: destinationId,
          ["user_id"]: userId,
        });
      })
    );

    return true;
  } catch (error) {
    return false;
  }
};

import { knexConnection } from "@services/connect-db-knex";
import { DestinationAttributesKnex } from "@types-internal/destination/destination-attributes-knex";

export const updateDestinationSeats = async (
  id: string,
  seatsToBook: string[]
): Promise<boolean> => {
  try {
    const destinationInfo: DestinationAttributesKnex[] = await knexConnection(
      "Destination"
    ).where("id", id);

    if (destinationInfo.length === 0) {
      throw new Error("Destination is not founded");
    }

    const destinationSeats = JSON.parse(destinationInfo[0].seats) as {
      id: string;
      isAvailable: boolean;
    }[];

    const newDestinationSeats = destinationSeats.map((seat) => {
      if (seatsToBook.includes(seat.id)) {
        return { ...seat, isAvailable: false };
      }
      return seat;
    });

    const seatsLength = seatsToBook.length;
    const newBookCount = +destinationInfo[0].booked_count + seatsLength;
    const newAvailableCount = +destinationInfo[0].available_count - seatsLength;

    await knexConnection("Destination")
      .update({
        ["booked_count"]: newBookCount,
        ["available_count"]: newAvailableCount,
        ["seats"]: JSON.stringify(newDestinationSeats),
      })
      .where("id", id);

    return true;
  } catch (error) {
    return false;
  }
};

// const seats = [
//   { id: "code-A1", isAvailable: true },
//   { id: "code-A2", isAvailable: true },
//   { id: "code-A3", isAvailable: true },
//   { id: "code-A4", isAvailable: true },
//   { id: "code-A5", isAvailable: true },
//   { id: "code-A6", isAvailable: true },
//   { id: "code-A8", isAvailable: true },
//   { id: "code-A9", isAvailable: true },
//
//   { id: "code-D1", isAvailable: true },
//   { id: "code-D2", isAvailable: true },
//   { id: "code-D3", isAvailable: true },
//   { id: "code-D4", isAvailable: true },
//   { id: "code-D5", isAvailable: true },
//   { id: "code-D6", isAvailable: true },
//   { id: "code-D8", isAvailable: true },
//   { id: "code-D9", isAvailable: true },
//
//   { id: "code-B3", isAvailable: true },
//   { id: "code-B4", isAvailable: true },
//   { id: "code-B5", isAvailable: true },
//   { id: "code-B6", isAvailable: true },
//   { id: "code-B9", isAvailable: true },
//
//   { id: "code-C3", isAvailable: true },
//   { id: "code-C4", isAvailable: true },
//   { id: "code-C5", isAvailable: true },
//   { id: "code-C6", isAvailable: true },
//   { id: "code-C9", isAvailable: true },
// ];

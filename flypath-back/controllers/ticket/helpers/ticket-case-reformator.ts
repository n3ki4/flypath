import { TicketAttributesKnex } from "@types-internal/ticket/ticket-attributes-knex";
import { TicketAttributes } from "@types-internal/ticket/ticket-attributes";

const inCamel = (obj: TicketAttributesKnex): TicketAttributes => {
  return {
    id: obj.id,
    placeNumber: obj.place_number,
    distance: obj.distance,
    duration: obj.duration,
    fullName: obj.full_name,
    destinationId: obj.destination_id,
    userId: obj.user_id,
    createdDate: obj.created_date,
    updatedDate: obj.updated_date,

    name: obj.name,
    price: obj.price,
    pointStartId: obj.point_start_id,
    pointEndId: obj.point_end_id,
    start: {
      date: obj.dateStart,
      city: obj.cityStart,
      aeroport: {
        name: obj.aeroportStartName,
      },
      company: {
        name: obj.companyStartName,
        rate: obj.companyStartRate,
        description: obj.companyStartDescription,
        owner: obj.companyStartOwner,
      },
    },
    end: {
      date: obj.dateEnd,
      city: obj.cityEnd,
      aeroport: {
        name: obj.aeroportEndName,
      },
      company: {
        name: obj.companyEndName,
        rate: obj.companyEndRate,
        description: obj.companyEndDescription,
        owner: obj.companyEndOwner,
      },
    },
  };
};

export { inCamel };

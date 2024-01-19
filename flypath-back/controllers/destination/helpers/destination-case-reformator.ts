import { DestinationAttributesKnex } from "@types-internal/destination/destination-attributes-knex";
import { DestinationAttributes } from "@types-internal/destination/destination-attributes";
import { FilterOptionsReformated } from "@types-internal/filtration/filtration-options-reformated";

const inCamel = (
  obj: DestinationAttributesKnex,
  filters?: FilterOptionsReformated
): DestinationAttributes => {
  return {
    id: obj.id,
    name: obj.name,
    price: obj.price,
    seatsCount: obj.seats_count,
    bookedCount: obj.booked_count,
    seats: obj.seats,
    availableCount: obj.available_count,
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
    requestedNumberOfSeats: filters?.availableCount,
    createdAt: obj.created_date,
    updatedAt: obj.updated_date,
  };
};

export { inCamel };

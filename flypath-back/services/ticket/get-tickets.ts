import { DestinationAttributesKnex } from "@types-internal/destination/destination-attributes-knex";
import { knexConnection } from "@services/connect-db-knex";
import { TicketAttributes } from "@types-internal/ticket/ticket-attributes";
import { inCamel } from "@controllers/ticket/helpers/ticket-case-reformator";
import { TicketAttributesKnex } from "@types-internal/ticket/ticket-attributes-knex";

type ResponseType = { rows: TicketAttributes[]; count?: number };

export const getTickets = async (userId: string): Promise<ResponseType> => {
  const response: TicketAttributesKnex[] = await knexConnection
    .select(
      "Ticket.*",
      "Destination.*",
      "PointStart.fly_date as dateStart",
      "PointEnd.fly_date as dateEnd",
      "PointStart.city as cityStart",
      "PointEnd.city as cityEnd",
      "startAeroport.name as aeroportStartName",
      "endAeroport.name as aeroportEndName",
      "startCompany.name as companyStartName",
      "startCompany.rate as companyStartRate",
      "startCompany.description as companyStartDescription",
      "startCompany.owner_full_name as companyStartOwner",
      "endCompany.name as companyEndName",
      "endCompany.rate as companyEndRate",
      "endCompany.description as companyEndDescription",
      "endCompany.owner_full_name as companyEndOwner"
    )
    .count("Ticket.id")
    .from<DestinationAttributesKnex>("Ticket")
    .join("Destination", "Destination.id", "Ticket.destination_id")
    .join("Point as PointStart", "Destination.point_start_id", "PointStart.id")
    .join("Point as PointEnd", "Destination.point_end_id", "PointEnd.id")
    .join(
      "Aeroport as startAeroport",
      "PointStart.plane_id",
      "startAeroport.id"
    )
    .join("Aeroport as endAeroport", "PointEnd.plane_id", "endAeroport.id")
    .join(
      "Company as startCompany",
      "startAeroport.company_id",
      "startCompany.id"
    )
    .join("Company as endCompany", "endAeroport.company_id", "endCompany.id")

    .where("Ticket.user_id", userId)
    .groupBy("Ticket.id");

  const rowsCount = response?.length !== 0 ? response[0]["count"] : 0;
  return {
    count: rowsCount,
    rows: response.map((item) => inCamel(item)),
  };
};

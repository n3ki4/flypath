import { DestinationAttributesKnex } from "@types-internal/destination/destination-attributes-knex";
import { knexConnection } from "@services/connect-db-knex";
import { inCamel } from "@controllers/destination/helpers/destination-case-reformator";
import { DestinationAttributes } from "@types-internal/destination/destination-attributes";

export const getDestination = async (
  id: string
): Promise<DestinationAttributes | null> => {
  // @ts-ignore
  const response: DestinationAttributesKnex[] = await knexConnection
    .select(
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
    .count("Destination.id")
    .from<DestinationAttributesKnex>("Destination")
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
    .where("Destination.id", id);

  return response ? inCamel(response[0]) : null;
};

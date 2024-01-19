import { FilterOptionsReformated } from "@types-internal/filtration/filtration-options-reformated";
import { DestinationAttributesKnex } from "@types-internal/destination/destination-attributes-knex";
import { knexConnection } from "@services/connect-db-knex";
import { inCamel } from "@controllers/destination/helpers/destination-case-reformator";
import { destinationFilterKnex } from "@services/destination/destination-filter-knex";
import { Knex } from "knex";
import { DestinationAttributes } from "@types-internal/destination/destination-attributes";
import { pointFilterKnex } from "@services/destination/point-filter-knex";

type ResponseType = { rows: DestinationAttributes[]; count?: number };

export const getDestinations = async (
  filters: FilterOptionsReformated
): Promise<ResponseType> => {
  const response: DestinationAttributesKnex[] = await knexConnection
    .select(
      "Destination.*",
      "PointStart.fly_date as dateStart",
      "PointEnd.fly_date as dateEnd",
      "PointStart.city as cityStart",
      "PointEnd.city as cityEnd",
      "AeroportStart.name as aeroportStartName",
      "AeroportEnd.name as aeroportEndName",
      "CompanyStart.name as companyStartName",
      "CompanyStart.rate as companyStartRate",
      "CompanyStart.description as companyStartDescription",
      "CompanyStart.owner_full_name as companyStartOwner",
      "CompanyEnd.name as companyEndName",
      "CompanyEnd.rate as companyEndRate",
      "CompanyEnd.description as companyEndDescription",
      "CompanyEnd.owner_full_name as companyEndOwner"
    )
    .count("Destination.id")
    .from<DestinationAttributesKnex>("Destination")
    .join("Point as PointStart", "Destination.point_start_id", "PointStart.id")
    .join(
      "Aeroport as AeroportStart",
      "AeroportStart.id",
      "PointStart.plane_id"
    )
    .join(
      "Company as CompanyStart",
      "CompanyStart.id",
      "AeroportStart.company_id"
    )
    .join("Point as PointEnd", "Destination.point_end_id", "PointEnd.id")
    .join("Aeroport as AeroportEnd", "AeroportEnd.id", "PointEnd.plane_id")
    .join("Company as CompanyEnd", "CompanyEnd.id", "AeroportEnd.company_id")

    .modify(
      (
        queryBuilder: Knex.QueryBuilder<
          DestinationAttributesKnex,
          DestinationAttributesKnex[]
        >
      ) => destinationFilterKnex(queryBuilder, filters)
    )
    .modify(
      (
        queryBuilder: Knex.QueryBuilder<
          DestinationAttributesKnex,
          DestinationAttributesKnex[]
        >
      ) => pointFilterKnex(queryBuilder, filters)
    )

    .groupBy("Destination.id");

  const rowsCount = response?.length !== 0 ? response[0]["count"] : 0;
  return {
    count: rowsCount,
    rows: response.map((item) => inCamel(item, filters)),
  };
};

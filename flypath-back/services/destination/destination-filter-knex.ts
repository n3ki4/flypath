import { Knex } from "knex";
import { DestinationAttributesKnex } from "@types-internal/destination/destination-attributes-knex";
import { FilterOptionsReformated } from "@types-internal/filtration/filtration-options-reformated";
import { minMaxQuery } from "@helpers/filtration/knex/min-max-query";

export const destinationFilterKnex = (
  queryBuilder: Knex.QueryBuilder<
    DestinationAttributesKnex,
    DestinationAttributesKnex[]
  >,
  filters: FilterOptionsReformated
) => {
  const { price, availableCount } = filters;

  if (price) {
    minMaxQuery<DestinationAttributesKnex, DestinationAttributesKnex[]>(
      "Destination.price",
      price,
      queryBuilder
    );
  }
  if (availableCount) {
    queryBuilder.where("Destination.available_count", ">=", availableCount);
  }
};

import { Knex } from "knex";
import { DestinationAttributesKnex } from "@types-internal/destination/destination-attributes-knex";
import { FilterOptionsReformated } from "@types-internal/filtration/filtration-options-reformated";
import { likeQuery } from "@helpers/filtration/knex/like-query";

export const pointFilterKnex = (
  queryBuilder: Knex.QueryBuilder<
    DestinationAttributesKnex,
    DestinationAttributesKnex[]
  >,
  filters: FilterOptionsReformated
) => {
  const { city, date } = filters;

  if (city?.start) {
    likeQuery<DestinationAttributesKnex, DestinationAttributesKnex[]>(
      "PointStart",
      {
        ["city"]: city.start,
      },
      queryBuilder
    );
  }

  if (city?.end) {
    likeQuery<DestinationAttributesKnex, DestinationAttributesKnex[]>(
      "PointEnd",
      {
        ["city"]: city.end,
      },
      queryBuilder
    );
  }

  if (date) {
    likeQuery<DestinationAttributesKnex, DestinationAttributesKnex[]>(
      "PointStart",
      { ["fly_date"]: date.slice(0, 10) },
      queryBuilder
    );
  }
};

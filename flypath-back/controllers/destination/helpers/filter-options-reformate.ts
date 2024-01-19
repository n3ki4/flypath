import { FilterOptions } from "@types-internal/filtration/filtration-options";
import { FilterOptionsReformated } from "@types-internal/filtration/filtration-options-reformated";

export const reformateFilterOptions = (
  options: FilterOptions
): FilterOptionsReformated => {
  let filters = {
    availableCount: options.seats_count ?? undefined,
    date: options.date ?? undefined,
    price: {
      max: options.price_end ?? undefined,
      min: options.price_start ?? undefined,
    },
    city: {
      start: options.city_start ?? undefined,
      end: options.city_end ?? undefined,
    },
  };

  if (options.order_by) {
    const orderFilter = {
      order: {
        by: options.order_by,
        direction: options.order_direction ?? "DESC",
      },
    };
    filters = {
      ...filters,
      ...orderFilter,
    };
  }

  return filters;
};

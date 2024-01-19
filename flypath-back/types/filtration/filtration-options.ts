export interface DestinationFilterOptions {
  date?: string;
  seats_count?: number;
  price_start?: number;
  price_end?: number;
  city_start?: string;
  city_end?: string;
}

export interface FilterOptions extends DestinationFilterOptions {
  order_by?: string;
  order_direction?: "DESC" | "ASC";
}

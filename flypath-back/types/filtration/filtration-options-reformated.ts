import { MinMaxFormat } from "@types-internal/filtration/min-max-filter";
import { GeneralFilterType } from "@types-internal/filtration/general-filter";

export interface FilterOptionsReformated extends GeneralFilterType {
  availableCount?: number;
  date?: string;
  price: MinMaxFormat<number>;
  city?: {
    start?: string;
    end?: string;
  };
  order?: OrderFilterOptionReformated;
}

export interface OrderFilterOptionReformated {
  by: string;
  direction: "DESC" | "ASC";
}

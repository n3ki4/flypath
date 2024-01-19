import { MinMaxFilter } from "@types-internal/filtration/min-max-filter";
import { OrderFilterOptionReformated } from "@types-internal/filtration/filtration-options-reformated";

export type GeneralFilterType = {
  [key: string]:
    | string
    | number
    | undefined
    | MinMaxFilter
    | { start?: string; end?: string }
    | OrderFilterOptionReformated;
};

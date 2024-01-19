import { Op } from "sequelize";

import { MinMaxFilter } from "@types-internal/filtration/min-max-filter";

export const minMaxOperator = (
  fieldName: string,
  fieldValue: MinMaxFilter
): { [key: string]: unknown } | {} => {
  if (fieldValue.min && fieldValue.max) {
    return { [fieldName]: { [Op.between]: [fieldValue.min, fieldValue.max] } };
  }
  if (fieldValue.min) {
    return { [fieldName]: { [Op.gte]: fieldValue.min } };
  }
  if (fieldValue.max) {
    return { [fieldName]: { [Op.lte]: fieldValue.max } };
  }

  return {};
};

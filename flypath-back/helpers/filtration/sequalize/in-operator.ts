import { Op } from "sequelize";

export const inOperator = (
  fieldName: string,
  fieldValue?: string
): { [key: string]: unknown } | {} => {
  if (fieldValue) {
    return { [fieldName]: { [Op.in]: fieldValue } };
  }
  return {};
};

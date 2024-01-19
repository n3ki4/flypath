import { Optional } from "sequelize";

export interface IdentifierAttributes {
  id: string;
  firstName?: string;
  lastName?: string;
  code?: number;
  publisher?: string;
  birthday?: Date;
  userId: string;
}

export interface IdentifierCreationAttributes
  extends Optional<IdentifierAttributes, "id"> {}

import { Optional } from "sequelize";

export interface AeroportAttributes {
  id?: string;
  name: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AeroportCreationAttributes
  extends Optional<AeroportAttributes, "id" | "createdAt" | "updatedAt"> {}

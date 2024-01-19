import { Optional } from "sequelize";

export interface CompanyAttributes {
  id?: string;
  name: string;
  ownerFullName: string;
  foundationDate: string;
  description: string;
  rate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyCreationAttributes
  extends Optional<CompanyAttributes, "id" | "updatedAt" | "createdAt"> {}

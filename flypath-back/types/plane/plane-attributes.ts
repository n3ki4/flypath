import { Optional } from "sequelize";

export interface PlaneAttributes {
  id?: string;
  name: string;
  aeroportId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlaneCreationAttributes
  extends Optional<PlaneAttributes, "id" | "createdAt" | "updatedAt"> {}

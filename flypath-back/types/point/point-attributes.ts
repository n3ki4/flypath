import { Optional } from "sequelize";

export interface PointAttributes {
  id?: string;
  flyDate: Date;
  planeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PointCreationAttributes
  extends Optional<PointAttributes, "id" | "createdAt" | "updatedAt"> {}

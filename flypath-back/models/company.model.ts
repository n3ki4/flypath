import { Association, DataTypes, Model, UUIDV4 } from "sequelize";
import {
  CompanyAttributes,
  CompanyCreationAttributes,
} from "@types-internal/company/company-attributes";

import { seqConnection } from "@services/connect-db";
import { AeroportModel } from "./aeroport.model";

export class CompanyModel
  extends Model<CompanyAttributes, CompanyCreationAttributes>
  implements CompanyAttributes
{
  public static associations: {
    aeroport: Association<CompanyModel, AeroportModel>;
  };
  public id?: string;
  public name!: string;
  public ownerFullName!: string;
  public foundationDate!: string;
  public description!: string;
  public rate!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CompanyModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    ownerFullName: {
      field: "owner_full_name",
      type: DataTypes.STRING,
    },
    foundationDate: {
      field: "foundation_date",
      type: DataTypes.STRING,
    },
    description: {
      field: "description",
      type: DataTypes.STRING,
    },
    rate: {
      type: DataTypes.NUMBER,
    },
    createdAt: {
      field: "created_date",
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updated_date",
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "Company",
    sequelize: seqConnection,
    timestamps: true,
  }
);

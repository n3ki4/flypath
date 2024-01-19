import { PlaneModel } from "@models/plane.model";
import {
  AeroportAttributes,
  AeroportCreationAttributes,
} from "@types-internal/aeroport/aeroport-attributes";
import { Association, DataTypes, Model, UUIDV4 } from "sequelize";
import { seqConnection } from "@services/connect-db";
import { CompanyModel } from "./company.model";

export class AeroportModel
  extends Model<AeroportAttributes, AeroportCreationAttributes>
  implements AeroportAttributes
{
  public static associations: {
    aeroportId: Association<AeroportModel, PlaneModel>;
  };
  public id?: string;
  public name!: string;
  public companyId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AeroportModel.init(
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
    companyId: {
      field: "company_id",
      references: { model: CompanyModel, key: "id" },
      type: DataTypes.UUID,
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
    tableName: "Aeroport",
    timestamps: true,
    sequelize: seqConnection,
  }
);

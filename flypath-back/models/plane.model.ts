import { Association, DataTypes, Model, UUIDV4 } from "sequelize";
import { AeroportModel } from "@models/aeroport.model";
import {
  PlaneAttributes,
  PlaneCreationAttributes,
} from "@types-internal/plane/plane-attributes";
import { seqConnection } from "@services/connect-db";

export class PlaneModel
  extends Model<PlaneAttributes, PlaneCreationAttributes>
  implements PlaneAttributes
{
  public static associations: {
    planeId: Association<PlaneModel, AeroportModel>;
  };
  public id?: string;
  public name!: string;
  public aeroportId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PlaneModel.init(
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
    aeroportId: {
      field: "aeroport_id",
      references: { model: AeroportModel, key: "id" },
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
    tableName: "Plane",
    sequelize: seqConnection,
    timestamps: true,
  }
);

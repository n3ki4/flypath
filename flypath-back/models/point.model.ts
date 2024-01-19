import { Association, DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { seqConnection } from "@services/connect-db";
import {
  PointAttributes,
  PointCreationAttributes,
} from "@types-internal/point/point-attributes";
import { PlaneModel } from "@models/plane.model";
import { DestinationModel } from "@models/destination.model";

export class PointModel
  extends Model<PointAttributes, PointCreationAttributes>
  implements PointAttributes
{
  public static associations: {
    pointStart: Association<DestinationModel, PointModel>;
    pointEnd: Association<DestinationModel, PointModel>;
  };
  public id!: string;
  public flyDate!: Date;
  public planeId!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  // public addIdentifier!: HasManyAddAssociationMixin<
  //   IdentifierAttributes,
  //   number
  //   >;
  // public hasIdentifier!: HasManyHasAssociationMixin<
  //   IdentifierAttributes,
  //   number
  //   >;
  // public createIdentifier!: HasManyCreateAssociationMixin<IdentifierAttributes>;
  // public readonly identifier!: IdentifierAttributes & {
  //   [key: string]: unknown;
  // };

  public static initModel(sequelize: Sequelize): void {
    PointModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          unique: true,
          defaultValue: DataTypes.UUIDV4,
        },
        flyDate: {
          field: "fly_date",
          type: DataTypes.STRING,
        },
        planeId: {
          field: "plane_id",
          references: { model: PlaneModel, key: "id" },
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
        tableName: "Point",
        sequelize: seqConnection,
        timestamps: true,
      }
    );
  }
}

PointModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    flyDate: {
      field: "fly_date",
      type: DataTypes.STRING,
    },
    planeId: {
      field: "plane_id",
      references: { model: PlaneModel, key: "id" },
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
    tableName: "Point",
    sequelize: seqConnection,
    timestamps: true,
  }
);

import { Association, DataTypes, Model, UUIDV4 } from "sequelize";

import { seqConnection } from "@services/connect-db";

import {
  DestinationAttributes,
  DestinationCreationAttributes,
} from "@types-internal/destination/destination-attributes";
import { PointModel } from "@models/point.model";

export class DestinationModel
  extends Model<DestinationAttributes, DestinationCreationAttributes>
  implements DestinationAttributes
{
  public static associations: {
    identifier: Association<PointModel, DestinationModel>;
  };
  public id!: string; // Note that the `null assertion` `!` is required in strict mode.
  public price!: number;
  public name!: string;
  public seatsCount!: number;
  public bookedCount!: number;
  public seats!: string;
  public availableCount!: number;
  public pointStartId!: string;
  public pointEndId!: string;
  public start!: {
    date: Date;
    city: string;
    aeroport: {
      name: string;
    };
    company: {
      name: string;
      rate: number;
      description: string;
      owner: string;
    };
  };

  public end!: {
    date: Date;
    city: string;
    aeroport: {
      name: string;
    };
    company: {
      name: string;
      rate: number;
      description: string;
      owner: string;
    };
  };


  public requestedNumberOfSeats?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DestinationModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    price: {
      type: DataTypes.NUMBER,
    },
    name: {
      type: DataTypes.STRING,
    },
    seatsCount: {
      field: "seats_count",
      type: DataTypes.NUMBER,
    },
    bookedCount: {
      field: "booked_count",
      type: DataTypes.NUMBER,
    },
    seats: {
      type: DataTypes.STRING,
    },
    availableCount: {
      field: "available_count",
      type: DataTypes.NUMBER,
    },
    pointStartId: {
      field: "point_start_id",
      references: { model: PointModel, key: "id" },
      type: DataTypes.UUID,
    },
    pointEndId: {
      field: "point_end_id",
      references: { model: PointModel, key: "id" },
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
    requestedNumberOfSeats: {
      type: DataTypes.NUMBER,
    },
    start: {
      type: DataTypes.JSON, // or DataTypes.JSONB depending on your database
    },
    end: {
      type: DataTypes.JSON, // or DataTypes.JSONB depending on your database
    },
  },
  {
    tableName: "Destination",
    sequelize: seqConnection,
    timestamps: true,
  }
);

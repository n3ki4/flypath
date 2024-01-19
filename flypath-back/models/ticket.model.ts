import { DataTypes, ModelDefined, UUIDV4 } from "sequelize";

import { seqConnection } from "@services/connect-db";
import { DestinationModel } from "@models/destination.model";
import { UserModel } from "@models/user.model";
import {
  TicketAttributes,
  TicketCreationAttributes,
} from "@types-internal/ticket/ticket-attributes";

export const TicketModel: ModelDefined<
  TicketAttributes,
  TicketCreationAttributes
> = seqConnection.define(
  "Ticket",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    placeNumber: {
      field: "place_number",
      type: DataTypes.STRING,
    },
    distance: {
      type: DataTypes.NUMBER,
    },
    duration: {
      type: DataTypes.NUMBER,
    },
    destinationId: {
      field: "destination_id",
      references: { model: DestinationModel, key: "id" },
      type: DataTypes.UUID,
    },
    userId: {
      field: "user_id",
      references: { model: UserModel, key: "id" },
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
    tableName: "Ticket",
    timestamps: true,
  }
);

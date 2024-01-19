import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasOneCreateAssociationMixin,
  Model,
  UUIDV4,
} from "sequelize";

import { UserModel } from "./user.model";
import {
  IdentifierAttributes,
  IdentifierCreationAttributes,
} from "../types/user/identifier-attributes";

import { seqConnection } from "@services/connect-db";

export class IdentifierModel
  extends Model<IdentifierAttributes, IdentifierCreationAttributes>
  implements IdentifierAttributes
{
  public static associations: {
    identifier: Association<UserModel, UserModel>;
  };
  public id!: string; // Note that the `null assertion` `!` is required in strict mode.
  public firstName!: string;
  public lastName!: string;
  public birthday!: Date;
  public code!: number;
  public publisher!: string;
  public userId!: string;

  public addUser!: HasManyAddAssociationMixin<UserModel, number>;
  public hasUser!: HasManyHasAssociationMixin<UserModel, number>;

  public createUser!: HasOneCreateAssociationMixin<UserModel>;
  public readonly identifier!: IdentifierAttributes;
}

IdentifierModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING(35),
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING(35),
      field: "last_name",
    },
    birthday: {
      type: DataTypes.DATE(),
    },
    publisher: {
      type: DataTypes.STRING(50),
    },
    code: {
      type: DataTypes.STRING(15),
    },
    userId: {
      type: DataTypes.UUID,
      references: { model: UserModel, key: "id" },
      field: "user_id",
    },
  },
  {
    tableName: "Identifier",
    sequelize: seqConnection,
    timestamps: false,
  }
);

import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyHasAssociationMixin,
  Model,
  UUIDV4,
} from "sequelize";
import bcrypt from "bcrypt";

import {
  UserAttributes,
  UserCreationAttributes,
} from "@types-internal/user/user-attributes";
import { IdentifierAttributes } from "@types-internal/user/identifier-attributes";

import { UserType } from "@enums/user-type";

import { IdentifierModel } from "@models/identifier.model";

import { seqConnection } from "@services/connect-db";

export class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public static associations: {
    identifier: Association<UserModel, IdentifierModel>;
  };
  public id!: string;
  public name!: string;
  public type!: UserType;
  public username!: string;
  public email!: string;
  public password!: string;
  public phone?: string | null;
  public token?: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public addIdentifier!: HasManyAddAssociationMixin<
    IdentifierAttributes,
    number
  >;
  public hasIdentifier!: HasManyHasAssociationMixin<
    IdentifierAttributes,
    number
  >;
  public createIdentifier!: HasManyCreateAssociationMixin<IdentifierAttributes>;
  public readonly identifier!: IdentifierAttributes & {
    [key: string]: unknown;
  };
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    type: {
      type: DataTypes.ENUM("ADMIN", "USER"),
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(254),
    },
    phone: {
      type: DataTypes.STRING(50),
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
    tableName: "user",
    sequelize: seqConnection,
    timestamps: true,
    hooks: {
      beforeCreate: (model) => {
        if (!model.getDataValue("username")) {
          const createdUsername = model.getDataValue("email").split("@")[0];
          model.setDataValue("username", createdUsername);
        }
        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync(
          model.getDataValue("password"),
          salt
        );
        model.setDataValue("password", encryptedPassword);
      },
    },
  }
);

UserModel.hasOne(IdentifierModel, {
  foreignKey: "userId",
  as: "identifier",
  onDelete: "CASCADE",
});

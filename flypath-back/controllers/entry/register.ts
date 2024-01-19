import { NextFunction } from "express";

import { RESPONSE_CODES } from "message-catcher";
import { UserAttributes } from "../../types/user/user-attributes";
import { responseCatcher } from "@helpers/response-catcher";
import { createUser } from "@services/auth/create-user";

export const register = async (
  userInfo: UserAttributes,
  next: NextFunction
) => {
  try {
    const createdUser = await createUser(userInfo);
    const { password, ...userProfile }: UserAttributes = Object.assign(
      {},
      createdUser
    );

    next(
      responseCatcher<Omit<UserAttributes, "password">>({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: userProfile,
          message: "User is registered " + userInfo.email,
        },
      })
    );
  } catch (error) {
    next({
      responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
      message: error,
    });
  }
};

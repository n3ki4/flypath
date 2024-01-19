import { NextFunction } from "express";
import { RESPONSE_CODES } from "message-catcher";

import { findUserProfileById } from "@services/auth/find-user-profile-by-id";

import { errorCatcher } from "@helpers/error-catcher";
import { responseCatcher } from "@helpers/response-catcher";

import { UserAttributes } from "@types-internal/user/user-attributes";

export const getUserProfile = async (userId: string, next: NextFunction) => {
  try {
    const userProfile = await findUserProfileById(userId);

    if (!userProfile) {
      errorCatcher({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        message: "User is not existed",
      });
      return;
    }

    next(
      responseCatcher<UserAttributes>({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: userProfile,
          message: "User profile was deleted",
        },
      })
    );
  } catch (error) {
    next(error);
  }
};

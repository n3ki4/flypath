import { NextFunction } from "express";
import { RESPONSE_CODES } from "message-catcher";

import { updateUserProfileById } from "@services/auth/update-user-profile-by-id";

import { findUserById } from "@services/auth/find-user-by-id";

import { errorCatcher } from "@helpers/error-catcher";
import { responseCatcher } from "@helpers/response-catcher";

import { UserAttributes } from "@types-internal/user/user-attributes";

export const updateUserProfile = async (
  userId: string,
  userProfileFieldsToChange: UserAttributes,
  next: NextFunction
) => {
  try {
    const isUserUpdated = await updateUserProfileById(
      userId,
      userProfileFieldsToChange
    );

    if (!isUserUpdated) {
      errorCatcher({
        message: "User is not updated",
      });
      return;
    }

    const updatedUserProfile = await findUserById(userId);

    if (!updatedUserProfile) {
      errorCatcher({
        message: "Updated user is not found",
      });
      return;
    }

    const { password, ...userProfile } = updatedUserProfile;

    next(
      responseCatcher<Omit<UserAttributes, "password">>({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: userProfile,
          message: "User info is updated",
        },
      })
    );
  } catch (error) {
    next(error);
  }
};

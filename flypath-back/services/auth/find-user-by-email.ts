import { UserModel } from "@models/user.model";
import { IdentifierModel } from "@models/identifier.model";

import { UserAttributes } from "@types-internal/user/user-attributes";

export const findUserByEmail = async (
  email: string
): Promise<UserAttributes | null> => {
  try {
    const foundedUser = await UserModel.findOne({
      where: { email }
    });
    return foundedUser ? foundedUser.get() : null;
  } catch (error) {
    return null;
  }
};

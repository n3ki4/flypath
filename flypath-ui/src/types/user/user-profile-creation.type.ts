import { UserType } from '@enums/user-types.enum';

export type UserProfileCreation = {
  type?: UserType;
  username?: string;
  email: string;
  password: string;
  phone?: string | null;
  identifier?: Identifier;
  token?: string;
};

type Identifier = {
  firstName?: string;
  lastName?: string;
  code?: number;
  publisher?: string;
  deliveryAddress: string | null;
};

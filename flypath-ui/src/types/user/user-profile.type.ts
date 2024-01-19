import { UserType } from '@enums/user-types.enum';
import { UserIdentifier } from '@types-internal/user/user-identifier.type';

export type UserProfile = {
  id?: string;
  username: string;
  email: string;
  password: string;
  phone?: string | null;
  identifier?: UserIdentifier;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
};

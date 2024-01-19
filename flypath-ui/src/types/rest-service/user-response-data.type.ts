import { UserProfile } from '@types-internal/user/user-profile.type'

export interface UserResponseDataType {
  profile: UserProfile;
  token: string;
}

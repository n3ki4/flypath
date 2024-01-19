import { httpClient } from '@rest-services/axios/axios-instance'

import { UserCredentials } from '@types-internal/user/user-credentials.type'
import { Error, Success } from '@types-internal/rest-service/response.type'
import { UserResponseDataType } from '@types-internal/rest-service/user-response-data.type'
import { UserProfileCreation } from '@types-internal/user/user-profile-creation.type'

export const authAPI = {
  loginUser: (userCredentials: UserCredentials): Promise<Error | Success<UserResponseDataType>> => httpClient.post('auth/entry/login', userCredentials),
  registerUser: (userProfile: UserProfileCreation): Promise<Error | Success<{}>> => httpClient.post('auth/entry/register', userProfile),
  updateUserProfile: (userProfile: UserProfileCreation) => httpClient.put('auth/profile', userProfile)
}

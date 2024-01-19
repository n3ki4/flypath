import { userActions } from '@enums/store/user-actions.enum'

import { UserProfileCreation } from '@types-internal/user/user-profile-creation.type'
import { UserCredentials } from '@types-internal/user/user-credentials.type'
import { Error } from '@types-internal/rest-service/response.type'
import { UserProfile } from '@types-internal/user/user-profile.type'

import { UserType } from '@enums/user-types.enum'
import { TemporaryChosenDestination } from '@types-internal/store/user/user-initial-state'

export const userActionCreators = {
  setUserProfile: (profileWithToken: { profile: UserProfile; token?: string }) =>
    ({
      type: userActions.SET_USER_PROFILE,
      payload: profileWithToken
    } as const),
  setTemporaryChosenDestination: (destinationWithBookedSeats: TemporaryChosenDestination | null) =>
    ({
      type: userActions.SET_TEMPORARY_CHOSEN_DESTINATION,
      payload: destinationWithBookedSeats
    } as const),
  toggleLoading: (isLoading: boolean) =>
    ({
      type: userActions.TOGGLE_LOADING,
      payload: isLoading
    } as const),
  catchError: (error: Error) =>
    ({
      type: userActions.CATCH_ERROR,
      payload: error
    } as const),
  logOut: () =>
    ({
      type: userActions.LOGOUT,
      payload: null
    } as const),
  // sagas
  login: (userCredentials: UserCredentials, userType: UserType) =>
    ({
      type: userActions.LOGIN,
      payload: { userCredentials }
    } as const),
  register: (userProfile: UserProfileCreation) =>
    ({
      type: userActions.REGISTER,
      payload: userProfile
    } as const),
  update: (userProfile: UserProfileCreation) =>
    ({
      type: userActions.UPDATE,
      payload: userProfile
    } as const)
}

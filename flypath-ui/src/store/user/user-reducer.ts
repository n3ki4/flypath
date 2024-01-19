import { userActions } from '@enums/store/user-actions.enum'

import { UserActionCreators } from '@types-internal/store/root-store.type'
import { UserInitialState } from '@types-internal/store/user/user-initial-state'

import { toast } from 'react-toastify'

const userInitialState = (): UserInitialState => ({
  isLoading: false,
  errorMessage: null,
  type: null,
  isAuth: false,
  profile: null,
  token: null,
  temporaryChosenDestination: null
})

export const userReducer = (state = userInitialState(), action: UserActionCreators): UserInitialState => {
  switch (action.type) {
    case userActions.SET_USER_PROFILE: {
      const { profile, token } = action.payload

      return {
        ...state,
        isAuth: true,
        profile,
        ...(token && { token })
      }
    }

    case userActions.SET_TEMPORARY_CHOSEN_DESTINATION: {
      const temporaryChosenDestination = action.payload

      return {
        ...state,
        temporaryChosenDestination
      }
    }

    case userActions.TOGGLE_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      }
    }

    case userActions.CATCH_ERROR: {
      const error = action.payload

      toast.error(error.message)

      return {
        ...state,
        isLoading: false,
        errorMessage: error.message
      }
    }

    case userActions.LOGOUT: {
      return userInitialState()
    }

    default:
      return state
  }
}

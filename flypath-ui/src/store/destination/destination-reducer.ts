import { toast } from 'react-toastify'

import { DestinationInitialState } from '@types-internal/store/destination/destination-initial-state'
import { DestinationActionCreators } from '@types-internal/store/root-store.type'
import { destinationActions } from '@enums/store/destination-actions.enum'

const destinationInitialState = (): DestinationInitialState => ({
  isLoading: false,
  errorMessage: null,
  list: [],
  item: null
})

export const destinationReducer = (state = destinationInitialState(), action: DestinationActionCreators): DestinationInitialState => {
  switch (action.type) {
    case destinationActions.TOGGLE_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      }
    }

    case destinationActions.CATCH_ERROR: {
      const error = action.payload

      toast.error(error.message)

      return {
        ...state,
        isLoading: false,
        errorMessage: error.message
      }
    }

    case destinationActions.SET_DESTINATION_LIST: {
      const destinations = action.payload

      return {
        ...state,
        list: destinations
      }
    }

    case destinationActions.SET_DESTINATION_ITEM: {
      const destinationInfo = action.payload

      return {
        ...state,
        item: destinationInfo
      }
    }

    default:
      return state
  }
}

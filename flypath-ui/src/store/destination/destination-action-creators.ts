import { Error } from '@types-internal/rest-service/response.type'
import { Destination } from '@types-internal/destination/destination.type'
import { destinationActions } from '@enums/store/destination-actions.enum'

export const destinationActionCreators = {
  setDestinationList: (destinationList: Destination[]) =>
    ({
      type: destinationActions.SET_DESTINATION_LIST,
      payload: destinationList
    } as const),
  setDestinationItem: (destinationInfo: Destination) =>
    ({
      type: destinationActions.SET_DESTINATION_ITEM,
      payload: destinationInfo
    } as const),
  toggleLoading: (isLoading: boolean) =>
    ({
      type: destinationActions.TOGGLE_LOADING,
      payload: isLoading
    } as const),
  catchError: (error: Error) =>
    ({
      type: destinationActions.CATCH_ERROR,
      payload: error
    } as const),

  // sagas
  loadDestinationList: (queryParams?: string) =>
    ({
      type: destinationActions.LOAD_DESTINATION_LIST,
      payload: queryParams
    } as const),
  loadDestinationById: (id: string) =>
    ({
      type: destinationActions.LOAD_DESTINATION_ITEM,
      payload: id
    } as const)
}

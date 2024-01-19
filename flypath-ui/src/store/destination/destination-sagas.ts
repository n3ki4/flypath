import { call, put, takeEvery } from 'redux-saga/effects'

import { destinationActionCreators } from '@store/destination/destination-action-creators'

import { destinationAPI } from '@rest-services/destination-service'

import { Error, Success } from '@types-internal/rest-service/response.type'
import { DestinationResponseDataType } from '@types-internal/rest-service/destination-response-data.type'

import { destinationActions } from '@enums/store/destination-actions.enum'
import { DestinationItemResponseDataType } from '@types-internal/rest-service/destination-item-response-data.type'

function* loadDestinations(args: LoadDestinationsSagaArgs) {
  try {
    const queryParams = args.payload
    yield put(destinationActionCreators.toggleLoading(true))
    const response: Success<DestinationResponseDataType> = yield call(() => destinationAPI.getDestinationList(queryParams))
    yield put(destinationActionCreators.toggleLoading(false))

    yield put(destinationActionCreators.setDestinationList(response.data.rows))
  } catch (error) {
    yield put(destinationActionCreators.catchError(error as Error))
  }
}

type LoadDestinationsSagaArgs = {
  type: destinationActions.LOAD_DESTINATION_LIST
  payload: string
}

function* loadDestinationItem(args: loadDestinationItemSagaArgs) {
  try {
    const id = args.payload
    yield put(destinationActionCreators.toggleLoading(true))
    const response: Success<DestinationItemResponseDataType> = yield call(() => destinationAPI.getDestinationItem(id))
    yield put(destinationActionCreators.toggleLoading(false))

    yield put(destinationActionCreators.setDestinationItem(response.data))
  } catch (error) {
    yield put(destinationActionCreators.catchError(error as Error))
  }
}

type loadDestinationItemSagaArgs = {
  type: destinationActions.LOAD_DESTINATION_LIST
  payload: string
}

export function* destinationSagasWatcher() {
  yield takeEvery(destinationActions.LOAD_DESTINATION_LIST, loadDestinations)
  yield takeEvery(destinationActions.LOAD_DESTINATION_ITEM, loadDestinationItem)
}

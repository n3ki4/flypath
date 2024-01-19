import { all } from 'redux-saga/effects'

import { userSagasWatcher } from '@store/user/user-sagas'
import { destinationSagasWatcher } from '@store/destination/destination-sagas'
import { ticketSagasWatcher } from '@store/ticket/ticket-sagas'

export function* rootSaga() {
  yield all([userSagasWatcher(), destinationSagasWatcher(), ticketSagasWatcher()])
}

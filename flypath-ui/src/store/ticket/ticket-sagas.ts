import { call, put, takeEvery } from 'redux-saga/effects'

import { userActionCreators } from '@store/user/user-action-creators'

import { Error, Success } from '@types-internal/rest-service/response.type'
import { ticketActions } from '@enums/store/ticket-actions.enum'
import { ticketActionCreators } from '@store/ticket/ticket-action-creators'
import { TicketResponseDataType } from '@types-internal/rest-service/ticket-response-data.type'
import { ticketAPI } from '@rest-services/ticket-service'
import { TemporaryChosenDestination } from '@types-internal/store/user/user-initial-state'
import { TicketCreatedByUser } from '@types-internal/ticket/tickets-create-by-user.type'

function* getUserTickets(args: LoginSagaArgs) {
  try {
    yield put(ticketActionCreators.toggleLoading(true))
    const response: Success<TicketResponseDataType> = yield call(() => ticketAPI.getTicketList())
    yield put(ticketActionCreators.toggleLoading(false))

    yield put(ticketActionCreators.setTicketList(response.data.rows))
  } catch (error) {
    yield put(userActionCreators.catchError(error as Error))
  }
}

type LoginSagaArgs = {
  type: ticketActions.LOAD_TICKET_LIST
  payload: null
}

function* createTickets(args: CreateTicketsSagaArgs) {
  try {
    const { formedTickets } = args.payload
    yield put(ticketActionCreators.toggleLoading(true))

    const preparedTickets: TicketCreatedByUser = {
      destinationId: formedTickets.destinationId,
      seats: formedTickets.seats.map((seatInfo) => ({
        fullName: `${seatInfo.firstName} ${seatInfo.lastName}`,
        seatCode: seatInfo.seatCode
      }))
    }

    const response: Success<null> = yield call(() => ticketAPI.postTicket(preparedTickets))
    yield put(ticketActionCreators.toggleLoading(false))

    yield put(userActionCreators.setTemporaryChosenDestination(null))
  } catch (error) {
    yield put(userActionCreators.catchError(error as Error))
  }
}

type CreateTicketsSagaArgs = {
  type: ticketActions.CREATE_TICKETS
  payload: { formedTickets: TemporaryChosenDestination }
}

function* getUserTicketById(args: GetUserTicketSagaArgs) {
  try {
    yield put(ticketActionCreators.toggleLoading(true))

    const response: Success<TicketResponseDataType> = yield call(() => ticketAPI.getUserTicketsList())
    yield put(ticketActionCreators.toggleLoading(false))

    // todo set ticket item
  } catch (error) {
    yield put(userActionCreators.catchError(error as Error))
  }
}

type GetUserTicketSagaArgs = {
  type: ticketActions.GET_USER_TICKET
  payload: null
}

export function* ticketSagasWatcher() {
  yield takeEvery(ticketActions.LOAD_TICKET_LIST, getUserTickets)
  yield takeEvery(ticketActions.CREATE_TICKETS, createTickets)
  yield takeEvery(ticketActions.GET_USER_TICKETS, getUserTickets)
  yield takeEvery(ticketActions.GET_USER_TICKET, getUserTicketById)
}

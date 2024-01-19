import { toast } from 'react-toastify'
import { TicketInitialState } from '@types-internal/store/ticket/ticket-initial-state'
import { ticketActions } from '@enums/store/ticket-actions.enum'
import { TicketActionCreators } from '@types-internal/store/root-store.type'

const ticketInitialState = (): TicketInitialState => ({
  isLoading: false,
  errorMessage: null,
  ticketList: null,
  choosedTicket: null
})

export const ticketReducer = (state = ticketInitialState(), action: TicketActionCreators): TicketInitialState => {
  switch (action.type) {
    case ticketActions.SET_TICKET_LIST: {
      const { ticketList } = action.payload

      return {
        ...state,
        ticketList
      }
    }

    case ticketActions.TOGGLE_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      }
    }

    case ticketActions.CATCH_ERROR: {
      const error = action.payload

      toast.error(error.message)

      return {
        ...state,
        isLoading: false,
        errorMessage: error.message
      }
    }

    case ticketActions.GET_TICKET_BY_ID: {
      const { foundedTicket } = action.payload
      return {
        ...state,
        choosedTicket: foundedTicket
      }
    }

    default:
      return state
  }
}

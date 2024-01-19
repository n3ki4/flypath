import { combineReducers } from 'redux'

import { userReducer } from '@store/user/user-reducer'
import { destinationReducer } from '@store/destination/destination-reducer'
import { ticketReducer } from '@store/ticket/ticket-reducer'

export const rootReducer = combineReducers({ userReducer, destinationReducer, ticketReducer })

export type StoreRootReducer = ReturnType<typeof rootReducer>

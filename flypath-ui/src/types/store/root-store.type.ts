import { userActionCreators } from '@store/user/user-action-creators'
import { destinationActionCreators } from '@store/destination/destination-action-creators'
import { ticketActionCreators } from '@store/ticket/ticket-action-creators'

type InferValueType<T> = T extends { [key: string]: infer U } ? U : never

export type InferActionsType<T extends { [key: string]: (...args: any) => any }> = ReturnType<InferValueType<T>>

export type UserActionCreators = InferActionsType<typeof userActionCreators>
export type DestinationActionCreators = InferActionsType<typeof destinationActionCreators>
export type TicketActionCreators = InferActionsType<typeof ticketActionCreators>

export type StoreActions = UserActionCreators | DestinationActionCreators | TicketActionCreators

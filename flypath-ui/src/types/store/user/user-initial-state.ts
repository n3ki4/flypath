import { UserType } from '@enums/user-types.enum'
import { UserProfile } from '@types-internal/user/user-profile.type'
import { BookedSeat } from '@types-internal/ticket/seat.type'

export type UserInitialState = {
  isLoading: boolean
  errorMessage: null | string
  type: null | UserType
  isAuth: boolean
  profile: null | UserProfile
  token: null | string
  temporaryChosenDestination: TemporaryChosenDestination | null
}

export type TemporaryChosenDestination = {
  destinationId: string
  seats: BookedSeat[]
  cardInfo?: any
}

import { Destination } from '@types-internal/destination/destination.type'

export type DestinationInitialState = {
  isLoading: boolean
  errorMessage: null | string
  list: Destination[]
  item: Destination | null
}

import { DestinationPoint } from '@types-internal/store/destination/point.type'

export type Destination = {
  id?: string
  name: string
  price: number
  seatsCount: number
  bookedCount: number
  seats: string
  availableCount: number
  pointStartId: string
  pointEndId: string
  start: DestinationPoint
  end: DestinationPoint
  requestedNumberOfSeats?: number
  createdAt: Date
  updatedAt: Date
}

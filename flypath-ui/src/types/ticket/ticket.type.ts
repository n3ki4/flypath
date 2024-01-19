import { DestinationPoint } from '@types-internal/store/destination/point.type'

export type Ticket = {
  id: string
  date: {
    startDate: string
    endDate: string
  }
  fullName: string
  placeNumber: string
  passengersCount: number
  duration?: number
  distance?: number
  name: string
  price: number
  pointStartId: string
  pointEndId: string
  start: DestinationPoint
  end: DestinationPoint
}

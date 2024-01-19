export type BookedSeat = {
  firstName: string
  lastName: string
  passportDate: string | null
  passportCountry: string
  passportNumber: number
  passportAvailableToDate: string
  sex: 'male' | 'female'
  seatCode: string
}

export type Seat = {
  id: string
  isAvailable: boolean
}
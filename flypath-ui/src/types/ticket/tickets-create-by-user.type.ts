export type TicketCreatedByUser = {
  destinationId: string
  // Need to be in future BookedSeats[]
  seats: { fullName: string; seatCode: string }[]
}

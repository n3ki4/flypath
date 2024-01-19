export type Checkout = {
  destinationId: string;
  seats: Seat[];
};

export type Seat = { fullName: string; seatCode: string };

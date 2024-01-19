import { Optional } from "sequelize";

export interface DestinationAttributes {
  id?: string;
  name: string;
  price: number;
  seatsCount: number;
  bookedCount: number;
  seats: string;
  availableCount: number;
  pointStartId: string;
  pointEndId: string;
  start: {
    date: Date;
    city: string;
    aeroport: {
      name: string;
    };
    company: {
      name: string;
      rate: number;
      description: string;
      owner: string;
    };
  };
  end: {
    date: Date;
    city: string;
    aeroport: {
      name: string;
    };
    company: {
      name: string;
      rate: number;
      description: string;
      owner: string;
    };
  };
  requestedNumberOfSeats?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DestinationCreationAttributes
  extends Optional<
    DestinationAttributes,
    "id" | "price" | "seatsCount" | "createdAt" | "updatedAt" | "bookedCount"
  > {}

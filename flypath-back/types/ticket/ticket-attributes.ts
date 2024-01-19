import { Optional } from "sequelize";

export interface TicketAttributes {
  id?: string;
  placeNumber: string;
  distance: number;
  duration: number;
  fullName: string;
  destinationId: string;
  userId: string;
  createdDate: Date;
  updatedDate: Date;

  name: string;
  price: number;
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
}

export interface TicketCreationAttributes
  extends Optional<TicketAttributes, "id"> {}

export interface TicketAttributesKnex {
  id?: string;
  place_number: string;
  distance: number;
  duration: number;
  destination_id: string;
  user_id: string;
  full_name: string;
  created_date: Date;
  updated_date: Date;
  count?: number;
  name: string;
  price: number;
  seats_count: number;
  booked_count: number;
  seats: string;
  available_count: number;
  point_start_id: string;
  point_end_id: string;

  dateStart: Date;
  dateEnd: Date;

  cityStart: string;
  cityEnd: string;

  aeroportStartName: string;
  aeroportEndName: string;

  companyStartName: string;
  companyStartRate: number;
  companyStartDescription: string;
  companyStartOwner: string;

  companyEndName: string;
  companyEndRate: number;
  companyEndDescription: string;
  companyEndOwner: string;
}

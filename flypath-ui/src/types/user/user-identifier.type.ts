export type UserIdentifier = {
  id: string;
  firstName?: string;
  lastName?: string;
  code?: number;
  publisher?: string;
  userId: string;
  deliveryAddress: string | null;
  birthday?: Date;
};

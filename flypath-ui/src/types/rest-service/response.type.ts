import { ErrorCodesEnum } from '@enums/error-codes.enum';

export type Response<DataType> = Error | Success<DataType>;

export type Error = {
  timestamp: string;
  status: number;
  errorCode: ErrorCodesEnum;
  message: string;
  data: null;
};

export type Success<DataType> = {
  timestamp: string;
  status: number;
  errorCode: null;
  message: string | null;
  data: DataType;
};

export const isResponseError = <DataType>(
  value: Response<DataType>
): value is Error => (value as Error).errorCode !== null;

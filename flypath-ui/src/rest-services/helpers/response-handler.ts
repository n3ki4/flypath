import {
  isResponseError,
  Response
} from '@types-internal/rest-service/response.type';

export const responseHandler = <DataType>(response: Response<DataType>) => {
  if (isResponseError(response)) {
    return new Error(response.message);
  }
  return response.data;
};

import { httpClient } from '@rest-services/axios/axios-instance'

import { Success } from '@types-internal/rest-service/response.type'
import { DestinationResponseDataType } from '@types-internal/rest-service/destination-response-data.type'
import { DestinationItemResponseDataType } from '@types-internal/rest-service/destination-item-response-data.type'

export const destinationAPI = {
  getDestinationList: (queryParams?: string): Promise<Error | Success<DestinationResponseDataType>> =>
    httpClient.get(`public/destination/list${queryParams ?? ''}`),
  getDestinationItem: (id: string): Promise<Error | Success<DestinationItemResponseDataType>> => httpClient.get(`public/destination/item/${id}`)
}

import { Store } from 'redux'
import { StoreRootReducer } from '@store/root-reducer'
import { StoreActions } from '@types-internal/store/root-store.type'
import { Error, Success } from '@types-internal/rest-service/response.type'
import { userActionCreators } from '@store/user/user-action-creators'
import { httpClient } from '@rest-services/axios/axios-instance'

export const setUpInterceptors = (store: Store<StoreRootReducer, StoreActions>) => {
  httpClient.interceptors.request.use((config) => ({
    ...config,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': store.getState().userReducer.token,
      'Access-Control-Allow-Origin': '*'
    }
  }))

  httpClient.interceptors.response.use<Promise<Error | Success<unknown>>>(
    (response) => response.data,
    (error) => {
      if (error.response.data.errorCode === 401) {
        store.dispatch(userActionCreators.logOut())
      }
      return Promise.reject(error.response.data)
    }
  )
}

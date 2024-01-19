import { call, put, takeEvery } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import { userActionCreators } from '@store/user/user-action-creators'

import { authAPI } from '@rest-services/user-service'

import { Error, Success } from '@types-internal/rest-service/response.type'
import { UserResponseDataType } from '@types-internal/rest-service/user-response-data.type'
import { UserCredentials } from '@types-internal/user/user-credentials.type'
import { UserProfile } from '@types-internal/user/user-profile.type'

import { userActions } from '@enums/store/user-actions.enum'
import { UserType } from '@enums/user-types.enum'

function* login(args: LoginSagaArgs) {
  try {
    const { userCredentials } = args.payload
    yield put(userActionCreators.toggleLoading(true))
    const response: Success<UserResponseDataType> = yield call(() => authAPI.loginUser(userCredentials))
    yield put(userActionCreators.toggleLoading(false))

    yield put(userActionCreators.setUserProfile(response.data))
  } catch (error) {
    yield put(userActionCreators.catchError(error as Error))
  }
}

type LoginSagaArgs = {
  type: userActions.LOGIN
  payload: { userCredentials: UserCredentials; userType: UserType }
}

function* register(args: RegisterSagaArgs) {
  try {
    const userProfile = args.payload
    yield put(userActionCreators.toggleLoading(true))
    const response: Success<{}> = yield call(() => authAPI.registerUser(userProfile))
    yield put(userActionCreators.toggleLoading(false))
    toast.success(response.message)
  } catch (error) {
    yield put(userActionCreators.catchError(error as Error))
  }
}

type RegisterSagaArgs = {
  type: userActions.REGISTER
  payload: UserProfile
}

function* update(args: UpdateSagaArgs) {
  try {
    const userProfile = args.payload
    yield put(userActionCreators.toggleLoading(true))
    const response: Success<UserProfile> = yield call(() => authAPI.updateUserProfile(userProfile))
    yield put(userActionCreators.toggleLoading(false))

    yield put(userActionCreators.setUserProfile({ profile: response.data }))
    toast.success(response.message)
  } catch (error) {
    yield put(userActionCreators.catchError(error as Error))
  }
}

type UpdateSagaArgs = {
  type: userActions.REGISTER
  payload: UserProfile
}

export function* userSagasWatcher() {
  yield takeEvery(userActions.LOGIN, login)
  yield takeEvery(userActions.REGISTER, register)
  yield takeEvery(userActions.UPDATE, update)
}

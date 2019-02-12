import { call, put } from 'redux-saga/effects'
import UserActions from '../redux/UserRedux'

export function* loginUser(api, action) {
  const { uid, pwd } = action
  const response = yield call(api.login_user, uid, pwd)

  if (response) {
    yield put(UserActions.loginUserSuccess(response))
  } else {
    yield put(UserActions.loginUserFailure())
  }
}

export function* createUser(api, action) {
  const { uid, pwd, first_name, last_name } = action
  const response = yield call(api.create_user, uid, pwd, first_name, last_name)

  if (response) {
    yield put(UserActions.createUserSuccess(response))
  } else {
    yield put(UserActions.createUserFailure())
  }
}

export function* logoffUser(api, action) {
  const { uid, session_id } = action
  const response = yield call(api.logoff_user, uid, session_id)

  if (response) {
    yield put(UserActions.logoffUserSuccess())
  } else {
    yield put(UserActions.logoffUserFailure())
  }
}

import { takeEvery } from 'redux-saga'
import { fork, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// TODO: fix restack-core/src/actions/index.js
import { resetErrorMessage } from 'restack-core/lib/actions/errorMessage'

function* clearError() {
  console.log('clear!')
  yield put( resetErrorMessage() )
}

function* watchRequest() {
  yield takeEvery((action) => /REQUEST$/.test(action.type), clearError)
}

function* watchRoute() {
  yield takeEvery(LOCATION_CHANGE, clearError)
}

export default function* root() {
  yield [
    fork(watchRequest)
  ]
}

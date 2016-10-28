import { fork, put ,call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'

// 一个工具函数：返回一个 Promise，这个 Promise 将在 1 秒后 resolve
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// Our worker Saga: 将异步执行 increment 任务
export function* incrementAsync() {
  // yield delay(1000);
  yield call(delay,1000)
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action 调用后，派生一个新的 incrementAsync 任务
export function* watchIncrementAsync() {
  yield* takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export function* helloSaga() {
  console.log('Hello Sagas!');
}

export default function* root() {
  yield [
    fork(helloSaga),
    fork(watchIncrementAsync)
  ]
}

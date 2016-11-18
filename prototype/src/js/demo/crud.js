const crud = {
  name: 'crud',
  initialState: {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  sagas: {
    *list(action, {update, put, call}) {

      yield update({isFetching: true})

      // yield put({ type: "crudModules.REQUEST", payload: {isFetching: true} })
      const response = yield call(fetch, `/system/api/v1/modules`)
      if (response) {
        yield put({type: "crudModules.SUCCESS", response})
        // yield put({type: "crudModules.SUCCESS", Object.assign({})})
      } else {
        yield put({type: "crudModules.FAILURE", error})
      }
    },
    *update() {

    },
    *fetch() {
      yield console.log("fetching list");
    },
    *update() {

    },
    *destroy() {

    }
  }
}

export default crud

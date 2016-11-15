import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createUpdeep from '../src/reducers/updeep'

it('works', () => {
  const initialState = {
    crud: {isFetching: false}
  }

  // const reducer = createUpdeep(initialState, {dummy: (state = {}, action) => state});

  // const reducer = combineReducers({dummy: (state = {}, action) => state})

  // reducer({}, {type: 'try'})

  const store = createStore(
    (state, action) => {
      console.log(state)
      return state
    }
  )

  store.dispatch({type: '@@update', name: 'crud', updates: {isFetching: true}})

  console.log(store.getState())
})

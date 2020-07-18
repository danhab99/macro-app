import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const ACTIONS = {
  LOAD_BUTTONS: Symbol()
}

const categoriesReducer = (state, action) => {
  let newState = Object.assign({
    categories: {}
  }, state)

  if (action.type === ACTIONS.LOAD_BUTTONS) {
    newState.categories = action.categories
  }

  return newState
}

const reducers = combineReducers({
  categoriesState: categoriesReducer
})

const middlewares = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
  : compose(applyMiddleware(thunk));

const store = createStore(reducers, undefined, middlewares);

export default store

export function loadButtons(categories) {
  return store.dispatch({
    type: ACTIONS.LOAD_BUTTONS,
    categories
  })
}
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { func } from 'prop-types'

const ACTIONS = {
  LOAD_BUTTONS: Symbol(),
  CHANGE_COLUMNS: Symbol()
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

const appReducer = (state, action) => {
  let newState = Object.assign({
    columns: 4
  }, state)

  if (action.type === ACTIONS.CHANGE_COLUMNS) {
    newState.columns = action.columns
  }

  return newState
}

const reducers = combineReducers({
  categoriesState: categoriesReducer,
  appState: appReducer
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

export function changeColumns(columns) {
  return store.dispatch({
    type: ACTIONS.CHANGE_COLUMNS,
    columns
  })
}
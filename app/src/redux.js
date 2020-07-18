import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const ACTIONS = {
  LOAD_BUTTONS: Symbol()
}

const buttonsReducer = (state, action) => {
  let newState = Object.assign({
    buttons: {}
  }, state)

  if (action.type === ACTIONS.LOAD_BUTTONS) {
    newState.buttons = action.buttons
  }

  return newState
}

const reducers = combineReducers({
  buttonsState: buttonsReducer
})

const middlewares = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
  : compose(applyMiddleware(thunk));

const store = createStore(reducers, undefined, middlewares);

export default store

export function loadButtons(buttons) {
  return store.dispatch({
    type: ACTIONS.LOAD_BUTTONS,
    buttons
  })
}
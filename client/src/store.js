import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import client from './client'

import { cart, user, locale } from './reducers';

import { loadState, saveState } from './local-storage'

import { throttle } from 'lodash'

const persistedState = loadState()
console.log("persisted data: ", persistedState)
const store = createStore(
  combineReducers({
    cart,
    user,
    apollo: client.reducer(),
    locale
  }),
  persistedState, // initial state
  compose(
    applyMiddleware(client.middleware()),
    // If you are using the devToolsExtension, you can add it here also
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
)

store.subscribe(throttle(() => {
  saveState({
    cart: store.getState().cart,
    locale: store.getState().locale
  })
}, 1000))

export default store
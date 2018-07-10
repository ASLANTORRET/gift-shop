import _ from 'lodash'
import { combineReducers } from 'redux';

const astrum = (state = [], { type, id, quantity }) => {
  if (id){
    switch (type) {
      case 'ADD_TO_CART':
        const index = _.findIndex(state, { id })
        if (index !== -1) {
          return [
            ...state.slice(0, index),
            { id, quantity },
            ...state.slice(index+1)
          ]
        } else {
          return [ ...state, { id, quantity } ]
        }
      case 'REMOVE_FROM_CART':
        return state.filter((item) => (item.id !== id))
      default:
        return state
    }
  } else {
    switch (type) {
      case 'EMPTY_CART':
        return []
      default:
        return state
    }
  }
}

const oasis = (state = [], { type, oasis_id, quantity }) => {
  if (oasis_id){
    switch (type) {
      case 'ADD_TO_CART':
        const index = _.findIndex(state, { oasis_id })
        if (index !== -1) {
          return [
            ...state.slice(0, index),
            { oasis_id, quantity },
            ...state.slice(index+1)
          ]
        } else {
          return [ ...state, { oasis_id, quantity }]
        }
      case 'REMOVE_FROM_CART':
        return state.filter((item) => (item.oasis_id !== oasis_id))
      default:
        return state
      }
  } else {
    switch (type) {
      case 'EMPTY_CART':
        return []
      default:
        return state
    }
  }
}

const cart = combineReducers({
  astrum,
  oasis
})

export default cart
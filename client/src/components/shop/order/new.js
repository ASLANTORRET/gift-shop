import React from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { emptyCart } from '../../../actions/cart'
import { CREATE_ORDER_MUTATION } from '../../../mutations/order'

const NewOrder = ({ createOrder }) => {
  return (
    <div>
      <button onClick={createOrder}>Заказать</button>
    </div>
  )
}

const withState = connect(
  (state) => ({ cart: state.cart }),
  (dispatch) => ({
    emptyCart() {
      dispatch(emptyCart())
    }
  })
)

const withMutation = graphql(CREATE_ORDER_MUTATION, {
  props({ mutate, ownProps }) {
    return {
      createOrder() {
        const { cart, emptyCart } = ownProps
        const order = mutate({ variables: { input: { cart } } })
        if (order) {
          // emptyCart()
        }
      }
    }
  }
})


export default withState(withMutation(NewOrder))
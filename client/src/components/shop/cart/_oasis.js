import React from 'react'
import numeral from 'numeral'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { addToCartOasis, removeFromCartOasis } from '../../../actions/cart'

const Oasis = ({ item, addToCart, removeFromCart }) => {
  const { product } = item
  return (
    <tr>
      <td className="cart-image">
        <Link to={`/shop/oasis/product/${ product.article }`}>
          <img src={ product.images[0].big } alt={ product.name }/>
        </Link>
      </td>
      <td className="cart-ttl">
        <Link to={`/shop/oasis/product/${ product.article }`}>{product.name}</Link>
      </td>
      <td className="cart-price">
        <b>{ numeral(product.price).format('0,0') } ₸</b>
      </td>
      <td className="cart-quantity">
        <p className="cart-qnt">
          <input value={ item.quantity } type="text" onChange={(e) => {
            // console.log(e.target.value);
            addToCart( product.id, 
              parseInt(e.target.value, 10) || 1
            );
          }}/>
          <a href="#" className="cart-plus" onClick={(e) => {
            e.preventDefault();
            addToCart( product.id,
              item.quantity + 1
            )
          }}><i className="fa fa-angle-up"></i></a>
          <a href="#" className="cart-minus" onClick={(e) => {
            e.preventDefault();
            addToCart( product.id,
              item.quantity>1 ? item.quantity-1 : 1
            )
          }}><i className="fa fa-angle-down"></i></a>
        </p>
      </td>
      <td className="cart-summ">
        <b>{ numeral(product.price * item.quantity).format('0,0') } ₸</b>
        <p className="cart-forone">Цена за 1 шт. <b>{ numeral(product.price).format('0,0') } ₸</b></p>
      </td>
      <td className="cart-del">
        <a href="#" className="cart-remove" onClick={(e) => {
          e.preventDefault();
          removeFromCart( product.id );
        }}></a>
      </td>
    </tr>
  )
}

const withState = connect(
  null,
  (dispatch) => ({
    addToCart(oasis_id, quantity){
      dispatch(addToCartOasis({ oasis_id, quantity }))
    },
    removeFromCart(oasis_id) {
      dispatch(removeFromCartOasis({oasis_id}))
    },
  })
)
export default withState(Oasis)
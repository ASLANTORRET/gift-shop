import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const To = ({ length }) => {
  return (
    <div className="box-icon">
      <Link to={`/cart`} className="show-content cart-icon icon add-mark">
        <img src="shop/img/korzina.png"/>
          <span className="count">{ length }</span>
      </Link>
    </div>    
  )
}

const withState = connect(
  ({ cart: { astrum, oasis } }) => {
    const length = astrum.length + oasis.length
    return { length }
  }
)(To)
export default withState
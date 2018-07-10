import React from 'react'
import { graphql } from 'react-apollo'
import { DRAFT_QUERY } from '../../../queries/draft'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import HtmlContent from '../../html-content'

const DraftView = ({ loading, draft, oasis, astrum, subTotal }) => {
  if (loading) {
    return <p>loading...</p>
  }

  return (
    <div className="container stylization maincont">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Наименование</th>
            <th>Количество</th>
            <th>Стоимость</th>
          </tr>
        </thead>
        <tbody>
          { astrum && astrum.length
            ? <tr><th colSpan={4}>
                astrum
              </th></tr>
            : null
          }
          { astrum.map((product, index) => {
            return <tr key={index}>
              <td>{index+1}</td>
              <td><Link to={`/shop/astrum/product/${ product.astrum_id }`}><HtmlContent html={product.name}/></Link></td>
              <td>{product.quantity} x {product.price}</td>
              <td>{product.sum}</td>
            </tr>
          })}

          { oasis && oasis.length
            ? <tr><th colSpan={4}>
                oasis
              </th></tr>
            : null
          }
          { oasis.map((product, index) => {
            return <tr key={index}>
              <td>{index+1}</td>
              <td><Link to={`/shop/oasis/product/${ product.id }`}>{product.name}</Link></td>
              <td>{product.quantity} x {product.price}</td>
              <td>{product.sum}</td>
            </tr>
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Сумма</td>
            <td>{ subTotal }</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

const withData = graphql(DRAFT_QUERY, {
  options({ match: { params: { id } } }) {
    return { variables: { id } }
  },
  props({ data: { draft, loading }}) {
    if (loading) {
      return { loading }
    }
    let subTotal = 0
    const astrum = draft.cart.astrum.map(item => {
      const product = _.find(draft.products.astrum, { astrum_id: item.astrum_id })
      if (product) {
        const { quantity } = item
        const sum = quantity * product.price
        subTotal += sum
        return {
          ...product,
          quantity,
          sum,
        }
      }
    }).filter(p => p)
    const oasis = draft.cart.oasis.map(item => {
      const product = _.find(draft.products.oasis, { id: item.oasis_id })
      if (product) {
        const { quantity } = item
        const sum = quantity * product.price
        subTotal += sum
        return {
          ...product,
          quantity,
          sum,
        }
      }
    }).filter(p => p)
    return { oasis, astrum, subTotal }
  }
})

export default withData(DraftView)

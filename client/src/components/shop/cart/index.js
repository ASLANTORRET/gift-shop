import React from 'react'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { CART_QUERY } from '../../../queries/cart'
import { CREATE_DRAFT_MUTATION } from '../../../mutations/draft'

import Astrum from './_astrum'
import { connect } from 'react-redux'
import { emptyCart } from '../../../actions/cart'
import _ from 'lodash'
import Delivery from '../../delivery'

const Cart = ({loading, cart, subTotal, emptyCart, createDraft}) => {
  if (loading) {
    return <p>loading...</p>
  }
  return (
    <div className="container">
      <div className="row cart">
        <div className="col-sm-6">
        <h1 className="main-ttl uppercase">Ваша корзина</h1>
          <form action="#">
            <div className="cart-items-wrap">
              <table className="cart-items">
                <thead>
                {/* <tr>
                  <td className="cart-image">Фото</td>
                  <td className="cart-ttl">Наименование</td>
                  <td className="cart-price">Цена</td>
                  <td className="cart-quantity">Количество</td>
                  <td className="cart-summ">Сумма</td>
                  <td className="cart-del">&nbsp;</td>
                </tr> */}
                </thead>
                <tbody>
                  {subTotal > 0 ?
                  cart.astrum.map((item, index) =>
                    <Astrum item={item} key={index}/>
                  ): "Ваша корзина пустая"
                }
                </tbody>
              </table>
            </div>
            <ul className="cart-total">
              <li><a href="#" className="cart-clear" onClick={(e) => {
                e.preventDefault();
                emptyCart();
              }}>Очистить корзину</a></li>
              <li className="cart-summ">Сумма: <b>{ subTotal } ₸</b></li>
            </ul>                   
          </form>
        </div>
        <div className="col-sm-6">
              <div className="rycle-info">
                  <h3 className="sub-title uppercase">Условия доставки</h3>

                  <div className="rycle-info-in">
                      <div className="rycle-info-block">
                          <h4>Минимальная сумма заказа 2000&nbsp;тг. + бесплатная доставка.</h4>

                          <p>Количество боксов определяется объемом заказа.</p>
                      </div>
                      <div className="rycle-info-block delivery">
                          <h4>Бесплатная доставка действует в&nbsp;пределах:</h4>
                          <ul className="list-unstyled">
                              <li><big>Алматы</big><br/> Бостандыкского, Алмалинского, Медеуского (до&nbsp;малой
                                  станицы),<br/> Ауэзовского (до&nbsp;ул.&nbsp;б. Момышулы) районов.
                              </li>
                              <li><big>Астана</big><br/> Алматинского (до&nbsp;ул. Налдаякова и&nbsp;Кошкарбаева),<br/>
                                  Сарыаркинского (до&nbsp;вокзала), Есильского (до&nbsp;ул. Шабыт)
                                  районов.
                              </li>
                          </ul>
                          <p>Стоимость доставки в&nbsp;другие районы города от&nbsp;700&nbsp;тг.
                              Доставка в&nbsp;отдаленные районы рассматривается по&nbsp;ситуации, в&nbsp;зависимости
                              от&nbsp;загруженности дорог и&nbsp;количества заказов.</p>

                          <p><big><b>Режим работы: ежедневно с&nbsp;09:00 до&nbsp;23:00</b></big></p>
                      </div>
                      <div className="rycle-info-block meta">
                          <p>Оформляя заказ на&nbsp;доставку c&nbsp;сайта, либо через call-центр, Вы&nbsp;даете
                              согласие на&nbsp;получение sms или e-mail-рассылок, содержащих
                              информацию рекламного характера. В&nbsp;том случае, если&nbsp;Вы не&nbsp;желаете
                              получать какую-либо информацию, Вы&nbsp;можете сообщить об&nbsp;этом
                              операторам компании.</p>
                      </div>
                  </div>
              </div>
              {
                subTotal > 0 ? (
                  <div className="dpd-form">
                    <h3>Заполните форму для доставки</h3>
                    <Delivery 
                      cities={[{name:"Алматы",value:"almaty"},{name:"Астана",value:"astana"}]} 
                      types={[{name:"Стандард 800 KZT (2 - 3 раб.дн.)",value:"standart"},{name:"Экспресс 1700 KZT (1 раб. дн.)",value:"express"}]}
                      />
                  </div>
                ): ""
              }
              {
                subTotal > 0 ? (
                <div className="cart-submit">
                  <Link to={`/form`} className="cart-submit-btn">Заказать</Link> 
                  </div>
                ): ""
              }
              {/* <div className="cart-coupon">
                <input placeholder="your coupon" type="text"/>
                <a className="cart-coupon-btn" href="#"><img src="img/ok.png" alt="your coupon"/></a>
              </div> */}
              
              {/* <a href="#" className="cart-submit-btn" onClick={(e) => {
                e.preventDefault();
                createDraft();
              }}>Сохранить черновик</a> */}              
        </div>
      </div>
    </div>
  )
}



const withState = connect(
  (state) => {
    // console.log(state.cart)
    return state
  },
  (dispatch) => ({
    emptyCart(){
      dispatch(emptyCart())
    }
  })
)

const withMutation = graphql(CREATE_DRAFT_MUTATION, {
  props({ mutate, ownProps }) {
    return {
      createDraft() {
        const { cart } = ownProps
        const order = mutate({ variables: { input: { cart } } })
        if (order) {
          // emptyCart()
        }
      }
    }
  }
})

const withData = graphql(CART_QUERY,{
  options({ cart: { astrum} }) {
    return { variables: {
      astrum: astrum.map(item => {
        if (typeof item.id === 'number'){
          return item.id
        }
      }).filter(id => id)
    } }
  },
  props({ data, ownProps }) {
    if (data.loading) {
      return { loading: data.loading }
    }
    let subTotal = 0   
    const astrum = ownProps.cart.astrum.map(item => {
      const product = _.find(data.cart.astrum, { id: item.id })
      if (product) {
        subTotal += product.price * item.quantity
        return { ...item, product }
      }
    }).filter(i => i)
    return { cart: {astrum }, subTotal }
  },
})

export default withState(withMutation(withData(Cart)))

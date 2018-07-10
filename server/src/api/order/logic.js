import mongoose from '../mongoose'

import AstrumProductLogic from '../astrum/product/logic'

import _ from 'lodash'

const orderSchema = mongoose.Schema({
  // _id: String,
  clientId: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: String,
  subTotal: Number,
  total: Number,
  id: Number,
  cart: Object,
  products: Object,
  createdAt: Date,
  createdBy: mongoose.Schema.Types.ObjectId,
})

export const Orders = mongoose.model('orders', orderSchema)

const Logic = {
  async createOrder(root, { cart }, context) {
    const { astrum } = cart
    const products = {
      astrum: await AstrumProductLogic.products(root, { query: { astrum_id: { $in: astrum.map(item => item.astrum_id) } } }, context),
    }
    
    const clientId = (await context.user)._id
    let subTotal = 0

    subTotal += cart.astrum.reduce((acc, item) => {
      const product = _.find(products.astrum, { astrum_id: item.astrum_id })
      if (product) {
        return acc + product.price * item.quantity
      }
      return acc
    }, 0)
    const order = new Orders({cart, products, subTotal, clientId})

    await order.save()

    return order

  }
}

export default Logic
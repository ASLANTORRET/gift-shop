import { Products } from '../product/connector'
import AstrumProductLogic from '../astrum/product/logic'

const Resolver = {
  Cart: {
    // async cart(root, args, context) {
    //   const userCart = (await context.user).cart
    //   userCart.empire = userCart.empire || []
    //   userCart.oasis = userCart.oasis || []
    //   userCart.empire.forEach(item => {
    //     item.product = Products.findOne({astrumId: item.astrumId})
    //   })
    //   userCart.oasis.forEach(item => {
    //     item.product = OasisProducts.findOne({id: item.id})
    //   })
    //   return userCart
    // }
    length(root, args, context) {
      const astrumLength = root.astrum.length
      const oasisLength = root.oasis.length
      return astrumLength + oasisLength
    },
    astrum(root, args, context) {
      const { ids } = args
      return AstrumProductLogic.products(root, { query: { id: { $in: ids } } }, context)
    },
  },
}

export default Resolver
import OrderLogic from './logic'

import _ from 'lodash'

const Mutation = {
  async createOrder(root, { input }, context) {
    OrderLogic.createOrder(root, input, context)
  }
}

export default Mutation
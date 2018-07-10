import SlideLogic from './logic'

import _ from 'lodash'

const Mutation = {
  async createSlide(root, { input }, context) {
    return SlideLogic.createSlide(root, input, context)
  },
  async updateSlide(root, { input }, context) {
    return SlideLogic.updateSlide(root, input, context)
  },
  async deleteSlide(root, { input }, context) {
    return SlideLogic.deleteSlide(root, input, context)
  }
}

export default Mutation
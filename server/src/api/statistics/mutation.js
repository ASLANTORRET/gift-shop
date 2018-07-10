import StatisticsLogic from './logic'

import _ from 'lodash'

const Mutation = {
  async createStatistics(root, { input }, context) {
    return StatisticsLogic.createStatistics(root, input, context)
  },
}

export default Mutation
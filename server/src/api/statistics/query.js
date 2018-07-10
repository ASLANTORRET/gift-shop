import StatisticsLogic from './logic'

const Query = {
  statistics(root, args, context) {
    return StatisticsLogic.statistics(root, args, context)
  },
}

export default Query
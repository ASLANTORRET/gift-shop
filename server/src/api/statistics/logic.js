import mongoose from '../mongoose'

import {getAuthenticatedUser} from '../logic'

const statisticsSchema = mongoose.Schema({
  clientId: String,
  referrer: String,
  pathname: String,
  objectId: mongoose.Schema.Types.ObjectId,
  type: String,
  createdAt: { type: Date, default: Date.now }
})

export const Statistics = mongoose.model('statistics', statisticsSchema)

const Logic = {
  async createStatistics(root, { referrer, pathname, type, objectId }, context) {
    const client = await getAuthenticatedUser(context, 'client')
    if (client) {
      const clientId = client._id
      const statistics = Statistics.create({ referrer, pathname, type, objectId, clientId })
      return statistics
    }
  },
  async statistics(root, { }, context) {
    return Statistics.find()
  },
}

export default Logic
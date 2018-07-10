import { Categories } from './connector'
import { Products } from '../product/connector'

const Resolver = {
  Category: {
    async children(root, args, context) {
      return Categories.find({parentId: root._id})
    },
    async products(root, args, context) {
      const { offset, limit } = args
      return Products.find({categoryIds: root._id}).skip(offset).limit(limit)
    },
    async parent(root, args, context) {
      return Categories.findOne({_id: root.parentId})
    },
    async productCount(root, args, context) {
      return Products.find({categoryIds: root._id}).count()
    },
  }
}

export default Resolver
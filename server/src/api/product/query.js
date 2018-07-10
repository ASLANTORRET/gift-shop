import { Products } from './connector'

const Query = {
  product(root, args, context) {
    const { slug } = args
    return Products.findOne({slug})
  },
  // categories(root, args, context) {
  //   const { parentId } = args
  //   if (parentId) {
  //     return Categories.find({ parentId })
  //   } else {
  //     return Categories.find({ parentId: { $exists: false }, $or:[{ isFeatured: false }, { isFeatured: { $exists: false } }] })
  //   }
  // }
}

export default Query
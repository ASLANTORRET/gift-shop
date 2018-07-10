import OasisProductLogic from './logic'

const Query = {
  oasisProduct(root, { oasis_id }, context) {
    return OasisProductLogic.product(root, { query: { id: oasis_id } }, context)
  },
  oasisProducts(root, { search }, context) {
    return OasisProductLogic.products(root, { query: { $text: { $search: search } } }, context)
  }
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
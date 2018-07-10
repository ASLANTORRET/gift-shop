import AstrumCategoryLogic, { AstrumCategories } from './logic'

const Query = {
  astrumCategory(root, args, context) {
    const { astrum_id } = args
    return AstrumCategoryLogic.category(root, { query: { astrum_id } }, context)
  },
  
  astrumCategories(root, args, context) {
    const { category_id  } = args
    const sort = { name: 1 }
    if (category_id ) {
      return AstrumCategoryLogic.categories(root, { query: { category_id }, sort }, context )
    } else {
      return AstrumCategoryLogic.categories(root, { query: { category_id: null }, sort }, context )
    }
  }
}

export default Query
import OasisCategoryLogic from './logic'

const Query = {
  async oasisCategory(root, args, context) {
    const { path } = args
    return OasisCategoryLogic.category(root, { query: { path } }, context)
  },
  oasisCategories(root, args, context) {
    const { parent_id } = args
    if (parent_id) {
      return OasisCategoryLogic.categories(
        root,
        {
          query: { parent_id },
          sort: { lft: 1} 
        },
        context
      )
    } else {
      return OasisCategoryLogic.categories(
        root, 
        {
          query: { parent_id: null, level: 1 },
          sort: { name: 1 }
        },
        context
      )
    }
  }
}

export default Query
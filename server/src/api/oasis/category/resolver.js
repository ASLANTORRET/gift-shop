import OasisCategoryLogic from './logic'
import OasisProductLogic from '../product/logic'

const Resolver = {
  OasisCategory: {
    children(root, args, context) {
      return OasisCategoryLogic.categories(
        root,
        { query: { parent_id: root.id } },
        context
      )
    },
    async products(root, args, context) {
      const { offset, limit } = args
      const descendants = await Resolver.OasisCategory.descendants(root, args, context)
      const categoryIds = [root.id, ...descendants.map(d => d.id)]
      return OasisProductLogic.products(
        root,
        {
          query: {
            categories: { $in: categoryIds }
          },
          skip: offset,
          limit
        },
        context
      )
    },
    ancestors(root, args, context) {
      return OasisCategoryLogic.categories(
        root,
        {
          query: {
            root: root.root,
            lft: { $lt: root.lft },
            rgt: { $gt: root.rgt }
          },
          sort: { lft: 1}
        },
        context
      )
    },
    descendants(root, args, context) {
      return OasisCategoryLogic.categories(
        root,
        {
          query: {
            root: root.root,
            lft: { $gt: root.lft },
            rgt: { $lt: root.rgt } 
          },
          sort: { lft: 1 }
        },
        context
      )
    },
    parent(root, args, context) {
      return OasisCategoryLogic.category(
        root,
        {
          query: {
            id: root.parent_id,
            root: root.root
          } 
        }
      )
    },
    async productCount(root, args, context) {
      const descendants = await Resolver.OasisCategory.descendants(root, args, context)
      const categoryIds = [root.id, ...descendants.map(d => d.id)]
      const query = { categories: { $in: categoryIds } }
      return OasisProductLogic.count(root, {query}, context)
    },
  }
}

export default Resolver

import CategoryLogic from './logic'

const Mutation = {
  async importOasisCategories(root, args, context) {
    return CategoryLogic.importCategories(root, args, context)
  },
}

export default Mutation
import AstrumCategoryLogic from './logic'

const Mutation = {
  async importAstrumCategories(root, args, context) {
    return AstrumCategoryLogic.importCategories(root, args, context)
  },
}

export default Mutation
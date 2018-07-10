import AstrumProductLogic from './logic'

const Mutation = {
  async importAstrumProducts(root, args, context) {
    return AstrumProductLogic.importProducts(root, args, context)
  }
}

export default Mutation
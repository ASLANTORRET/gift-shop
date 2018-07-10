import OasisProductLogic from './logic'

const Mutation = {
  async importOasisProducts(root, args, context) {
    return OasisProductLogic.importProducts(root, args, context)
  },
}

export default Mutation